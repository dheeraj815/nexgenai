@echo off
title NexGenAI — Database Seed
cd /d "%~dp0\.."
backend\venv\Scripts\python.exe -m database.seeds.seed_data
pause
