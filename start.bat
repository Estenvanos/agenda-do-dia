@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 goto error
)
echo Abrindo a Agenda do Dia...
call npm run dev -- --open
exit /b 0
:error
echo.
echo Nao foi possivel iniciar. Verifique se o Node.js esta instalado.
pause
exit /b 1
