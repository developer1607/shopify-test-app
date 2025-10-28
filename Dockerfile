FROM php:8.3-fpm-alpine

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY

# Install system dependencies and PHP extensions
RUN apk update && apk add --no-cache \
    nodejs npm composer nginx bash openrc \
    libpng-dev libjpeg-turbo-dev libwebp-dev libzip-dev zip unzip \
    php-pdo_sqlite php-pdo_mysql php-pdo_pgsql php-simplexml php-fileinfo php-dom php-tokenizer php-xml php-xmlwriter php-session

# Enable PDO extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy app files
COPY --chown=www-data:www-data web /app
WORKDIR /app

# Overwrite default nginx config
COPY web/nginx.conf /etc/nginx/nginx.conf

# Use production PHP configuration
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Prepare SQLite file (if used)
RUN touch /app/storage/db.sqlite && chown www-data:www-data /app/storage/db.sqlite

# Build frontend
RUN cd frontend && npm install && npm run build
RUN php artisan migrate --force || true
# (Optional) If you have a custom composer script called "build"
# RUN composer build

ENTRYPOINT [ "/app/entrypoint.sh" ]
