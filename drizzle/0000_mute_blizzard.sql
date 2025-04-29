CREATE TABLE `macapa_clients` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`cell_phone` varchar(20) NOT NULL,
	CONSTRAINT `macapa_clients_id` PRIMARY KEY(`id`)
);
