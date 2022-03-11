cd frontend
del /f /s /q dist
npm run build
xcopy /s /i /e dist ..\backend\dist