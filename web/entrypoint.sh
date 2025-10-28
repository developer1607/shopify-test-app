#! /usr/bin/env bash
set -e

# Clean up openrc and nginx configurations
sed -i 's/hostname $opts/# hostname $opts/g' /etc/init.d/hostname
sed -i 's/#rc_sys=""/rc_sys="docker"/g' /etc/rc.conf
sed -i "s/listen PORT/listen $PORT/g" /etc/nginx/nginx.conf

cd /app

echo "======================================"
echo "🚀 Starting Laravel + Nginx container"
echo "======================================"

# Wait for database to be ready (Postgres/MySQL only)
if [ "$DB_CONNECTION" != "sqlite" ]; then
  echo "⏳ Waiting for database to be ready..."
  for i in {1..20}; do
    php artisan db:connection || true
    if [ $? -eq 0 ]; then
      echo "✅ Database is ready!"
      break
    fi
    echo "Database not ready yet... retrying ($i/20)"
    sleep 3
  done
fi

# Run migrations (ignore error if already migrated)
echo "🧩 Running database migrations..."
php artisan migrate --force || echo "⚠️ Migration step skipped (possibly already up to date)"

# Start Nginx
echo "🌐 Starting Nginx..."
openrc
touch /run/openrc/softlevel
rc-service nginx start

# Start PHP-FPM
echo "🐘 Starting PHP-FPM..."
exec php-fpm
