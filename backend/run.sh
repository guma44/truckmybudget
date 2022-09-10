#!/bin/bash

echo "I am herere"
echo "$(pwd)"
uvicorn app:app --host=0.0.0.0 --reload

