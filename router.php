<?php
// Servidor local de desenvolvimento: php -S 127.0.0.1:8000 router.php
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
if (str_starts_with($path, '/api/')) { require __DIR__ . '/api/index.php'; return true; }
$file = realpath(__DIR__ . $path);
if ($path !== '/' && $file && str_starts_with($file, realpath(__DIR__)) && is_file($file)) return false;
if ($path === '/') { readfile(__DIR__ . '/index.html'); return true; }
http_response_code(404); echo 'Not found'; return true;
