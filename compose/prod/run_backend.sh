#!/bin/bash

cd /opt/backend
uvicorn app:app --host=0.0.0.0 --reload

