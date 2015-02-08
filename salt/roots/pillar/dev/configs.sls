php:
  display_errors: 'On'
  display_startup_errors: 'On'
  memory_limit: '512M'
  timezone: 'UTC'

pre:
  restart: []

post:
  restart: ['nginx', 'php-fpm', 'redis']
