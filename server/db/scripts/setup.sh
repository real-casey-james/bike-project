echo 'building db'

mysql --database="$MYSQL_DATABASE" --user="$MYSQL_USER" --password="$MYSQL_PASSWORD" -e "CREATE TABLE IF NOT EXISTS stations (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude VARCHAR(20) NOT NULL,
    longitude VARCHAR(20) NOT NULL,
    bikes_available INT NOT NULL,
    deleted_at DATETIME DEFAULT NULL
);"

echo 'seeding db'

mysql --database="$MYSQL_DATABASE" --user="$MYSQL_USER" --password="$MYSQL_PASSWORD" -e "INSERT INTO stations (name, latitude, longitude, bikes_available) VALUES
('Bucket Fountain', -41.29225, 174.77629, 0),
('Te Papa', -41.290447, 174.782073, 5),
('Waitangi Park', -41.291447, 174.785249, 0),
('Botanic Gardens', -41.280389, 174.767587, 2),
('Kilbirnie Park', -41.316955, 174.795222, 8),
('Breaker Bay', -41.331393, 174.830317, 5),
('Happy Valley', -41.331425, 174.756897, 3),
('Karori Shops', -41.284494, 174.737918, 9),
('Zealandia', -41.290556, 174.753298, 4),
('Brooklyn Shops', -41.305328, 174.763467, 2),
('Basin Reserve', -41.299381, 174.780800, 5),
('Hataitai Beach', -41.305888, 174.798935, 9)
;"

echo 'db ready'