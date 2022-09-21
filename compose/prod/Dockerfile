FROM python:3.9

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
RUN wget -qO - https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update \
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  && apt-get install -y git \
  && apt-get install -y wget \
  && apt-get install -y tar \
  && apt-get install -y vim \
  && apt-get install -y supervisor \
  && apt-get install -y nginx \
  && apt-get install -y nodejs \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*


#########################################################
#################### INSTALL BACKEND ####################
#########################################################
WORKDIR /opt/backend
COPY ./backend/pyproject.toml  /opt/backend/

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false

RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --no-dev ; fi"

COPY ./backend /opt/backend
COPY ./compose/prod/run_backend.sh /run_backend.sh
RUN mkdir -p /data/files
RUN chmod -R a+rw /data/files
RUN chmod +x /run_backend.sh
EXPOSE 8000

#########################################################
#################### INSTALL FRONTEND ###################
#########################################################
WORKDIR /opt/frontend
COPY ./frontend /opt/frontend

# ==== BUILD =====
RUN npm ci 

# Set the env to "production"
ENV NODE_ENV prod

##########################################################
#################### SETUP SUPERVISOR ####################
##########################################################
COPY ./compose/prod/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN mkdir -p /var/log/backend && \
    mkdir -p /var/log/supervisor && \
    mkdir -p /data/db

COPY ./compose/prod/supervisor.conf /etc/supervisord.conf
COPY ./compose/prod/nginx.conf /etc/nginx/sites-enabled/default

EXPOSE 9001:9001

WORKDIR /opt

ENTRYPOINT ["/entrypoint.sh"]