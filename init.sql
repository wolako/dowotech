CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE DATABASE IF NOT EXISTS roundcubemail CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'wola-roundcube'@'%' IDENTIFIED BY 'woladwrcub';
GRANT ALL PRIVILEGES ON roundcubemail.* TO 'wola-roundcube'@'%';
FLUSH PRIVILEGES;

USE roundcubemail;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `users` (
    `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `username` varchar(128) BINARY NOT NULL,
    `mail_host` varchar(128) NOT NULL,
    `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    `last_login` datetime DEFAULT NULL,
    `failed_login` datetime DEFAULT NULL,
    `failed_login_counter` int(10) UNSIGNED DEFAULT NULL,
    `language` varchar(16) DEFAULT NULL,
    `preferences` longtext DEFAULT NULL,
    PRIMARY KEY(`user_id`),
    UNIQUE `username` (`username`, `mail_host`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `session` (
    `sess_id` varchar(128) NOT NULL,
    `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    `ip` varchar(40) NOT NULL,
    `vars` mediumtext NOT NULL,
    PRIMARY KEY(`sess_id`),
    INDEX `changed_index` (`changed`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cache` (
    `user_id` int(10) UNSIGNED NOT NULL,
    `cache_key` varchar(128) BINARY NOT NULL,
    `expires` datetime DEFAULT NULL,
    `data` longtext NOT NULL,
    PRIMARY KEY (`user_id`, `cache_key`),
    CONSTRAINT `user_id_fk_cache` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `expires_index` (`expires`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Roundcube Webmail initial database structure

SET FOREIGN_KEY_CHECKS=0;

-- Table structure for table `cache_shared`

CREATE TABLE IF NOT EXISTS `cache_shared` (
    `cache_key` varchar(255) BINARY NOT NULL,
    `expires` datetime DEFAULT NULL,
    `data` longtext NOT NULL,
    PRIMARY KEY (`cache_key`),
    INDEX `expires_index` (`expires`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `cache_index`

CREATE TABLE IF NOT EXISTS `cache_index` (
    `user_id` int(10) UNSIGNED NOT NULL,
    `mailbox` varchar(255) BINARY NOT NULL,
    `expires` datetime DEFAULT NULL,
    `valid` tinyint(1) NOT NULL DEFAULT '0',
    `data` longtext NOT NULL,
    CONSTRAINT `user_id_fk_cache_index` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `expires_index` (`expires`),
    PRIMARY KEY (`user_id`, `mailbox`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `cache_thread`

CREATE TABLE IF NOT EXISTS `cache_thread` (
    `user_id` int(10) UNSIGNED NOT NULL,
    `mailbox` varchar(255) BINARY NOT NULL,
    `expires` datetime DEFAULT NULL,
    `data` longtext NOT NULL,
    CONSTRAINT `user_id_fk_cache_thread` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `expires_index` (`expires`),
    PRIMARY KEY (`user_id`, `mailbox`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `cache_messages`

CREATE TABLE IF NOT EXISTS `cache_messages` (
    `user_id` int(10) UNSIGNED NOT NULL,
    `mailbox` varchar(255) BINARY NOT NULL,
    `uid` int(11) UNSIGNED NOT NULL DEFAULT '0',
    `expires` datetime DEFAULT NULL,
    `data` longtext NOT NULL,
    `flags` int(11) NOT NULL DEFAULT '0',
    CONSTRAINT `user_id_fk_cache_messages` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `expires_index` (`expires`),
    PRIMARY KEY (`user_id`, `mailbox`, `uid`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `collected_addresses`

CREATE TABLE IF NOT EXISTS `collected_addresses` (
    `address_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    `name` varchar(255) NOT NULL DEFAULT '',
    `email` varchar(255) NOT NULL,
    `user_id` int(10) UNSIGNED NOT NULL,
    `type` int(10) UNSIGNED NOT NULL,
    PRIMARY KEY(`address_id`),
    CONSTRAINT `user_id_fk_collected_addresses` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE INDEX `user_email_collected_addresses_index` (`user_id`, `type`, `email`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `contacts`

CREATE TABLE IF NOT EXISTS `contacts` (
    `contact_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    `del` tinyint(1) NOT NULL DEFAULT '0',
    `name` varchar(128) NOT NULL DEFAULT '',
    `email` text NOT NULL,
    `firstname` varchar(128) NOT NULL DEFAULT '',
    `surname` varchar(128) NOT NULL DEFAULT '',
    `vcard` longtext,
    `words` text,
    `user_id` int(10) UNSIGNED NOT NULL,
    PRIMARY KEY(`contact_id`),
    CONSTRAINT `user_id_fk_contacts` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `user_contacts_index` (`user_id`,`del`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `contactgroups`

CREATE TABLE IF NOT EXISTS `contactgroups` (
    `contactgroup_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` int(10) UNSIGNED NOT NULL,
    `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    `del` tinyint(1) NOT NULL DEFAULT '0',
    `name` varchar(128) NOT NULL DEFAULT '',
    PRIMARY KEY(`contactgroup_id`),
    CONSTRAINT `user_id_fk_contactgroups` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `contactgroups_user_index` (`user_id`,`del`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `contactgroupmembers`

CREATE TABLE IF NOT EXISTS `contactgroupmembers` (
    `contactgroup_id` int(10) UNSIGNED NOT NULL,
    `contact_id` int(10) UNSIGNED NOT NULL,
    `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    PRIMARY KEY (`contactgroup_id`, `contact_id`),
    CONSTRAINT `contactgroup_id_fk_contactgroups` FOREIGN KEY (`contactgroup_id`)
    REFERENCES `contactgroups`(`contactgroup_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `contact_id_fk_contacts` FOREIGN KEY (`contact_id`)
    REFERENCES `contacts`(`contact_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `contactgroupmembers_contact_index` (`contact_id`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `identities`

CREATE TABLE IF NOT EXISTS `identities` (
    `identity_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` int(10) UNSIGNED NOT NULL,
    `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    `del` tinyint(1) NOT NULL DEFAULT '0',
    `standard` tinyint(1) NOT NULL DEFAULT '0',
    `name` varchar(128) NOT NULL,
    `organization` varchar(128) NOT NULL DEFAULT '',
    `email` varchar(128) NOT NULL,
    `reply-to` varchar(128) NOT NULL DEFAULT '',
    `bcc` varchar(128) NOT NULL DEFAULT '',
    `signature` longtext,
    `html_signature` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY(`identity_id`),
    CONSTRAINT `user_id_fk_identities` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `user_identities_index` (`user_id`, `del`),
    INDEX `email_identities_index` (`email`, `del`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `responses`

CREATE TABLE IF NOT EXISTS `responses` (
    `response_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` int(10) UNSIGNED NOT NULL,
    `name` varchar(255) NOT NULL,
    `data` longtext NOT NULL,
    `is_html` tinyint(1) NOT NULL DEFAULT '0',
    `changed` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    `del` tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`response_id`),
    CONSTRAINT `user_id_fk_responses` FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX `user_responses_index` (`user_id`, `del`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `dictionary`

CREATE TABLE IF NOT EXISTS `dictionary` (
    `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` int(10) UNSIGNED,
    `language` varchar(16) NOT NULL,
    `data` longtext NOT NULL,
    CONSTRAINT `user_id_fk_dictionary` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE `uniqueness` (`user_id`, `language`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `searches`

CREATE TABLE IF NOT EXISTS `searches` (
    `search_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` int(10) UNSIGNED NOT NULL,
    `type` int(3) NOT NULL DEFAULT '0',
    `name` varchar(128) NOT NULL,
    `data` text,
    PRIMARY KEY(`search_id`),
    CONSTRAINT `user_id_fk_searches` FOREIGN KEY (`user_id`)
    REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE `uniqueness` (`user_id`, `type`, `name`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `filestore`

CREATE TABLE IF NOT EXISTS `filestore` (
    `file_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` int(10) UNSIGNED NOT NULL,
    `context` varchar(32) NOT NULL,
    `filename` varchar(128) NOT NULL,
    `mtime` int(10) NOT NULL,
    `data` longtext NOT NULL,
    PRIMARY KEY (`file_id`),
    CONSTRAINT `user_id_fk_filestore` FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE `uniqueness` (`user_id`, `context`, `filename`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `uploads`

CREATE TABLE IF NOT EXISTS `uploads` (
    `upload_id` varchar(64) NOT NULL,
    `session_id` varchar(128) NOT NULL,
    `group` varchar(128) NOT NULL,
    `metadata` mediumtext NOT NULL,
    `created` datetime NOT NULL DEFAULT '1000-01-01 00:00:00',
    PRIMARY KEY (`upload_id`),
    INDEX `uploads_session_group_index` (`session_id`, `group`, `created`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Table structure for table `system`

CREATE TABLE IF NOT EXISTS `system` (
    `name` varchar(64) NOT NULL,
    `value` mediumtext,
    PRIMARY KEY(`name`)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS=1;

INSERT INTO `system` (`name`, `value`) VALUES ('roundcube-version', '2022100100');