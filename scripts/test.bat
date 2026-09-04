@echo off
title NexGenAI — Automated Test Suite
cd /d "%~dp0\.."
backend\venv\Scripts\python.exe -m pytest tests/test_api.py -v
pause
