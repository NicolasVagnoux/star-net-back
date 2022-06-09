-- Hello, this a database setup script for our beautiful project
-- Before running this script, don't forget to create a database and use it
-- Themes table
DROP TABLE IF EXISTS `followedPackages`,
`chosenCategories`,
`articlesPackages`,
`articlesCategories`,
`packagesCategories`,
`bookmarks`,
`completedArticles`,
`packages`,
`comments`,
`articles`,
`users`,
`rights`,
`categories`,
`languages`,
`themes`;
-- Theme table
CREATE TABLE `themes` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL
);
-- Languages table
CREATE TABLE `languages` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL
);
-- Categories table
CREATE TABLE `categories` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `description` TEXT(500) NOT NULL
);
-- Rights table
CREATE TABLE `rights` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(80) NOT NULL
);
-- Users table 
CREATE TABLE `users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(80) NOT NULL,
    `lastName` VARCHAR(80) NOT NULL,
    `phoneNumber` VARCHAR(40),
    `email` VARCHAR(150) NOT NULL,
    `registrationDate` DATE,
    `userPicture` BLOB,
    `password` VARCHAR(100),
    `idTheme` INT DEFAULT (1),
    `idLanguage` INT DEFAULT (1),
    `idRight` INT DEFAULT (1),
    CONSTRAINT fk_users_themes FOREIGN KEY (`idTheme`) REFERENCES themes(`id`),
    CONSTRAINT fk_users_languages FOREIGN KEY (`idLanguage`) REFERENCES languages(`id`),
    CONSTRAINT fk_users_rights FOREIGN KEY (`idRight`) REFERENCES rights(`id`)
);
-- Articles table
CREATE TABLE `articles` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(80) NOT NULL,
    `idUser` INT NOT NULL,
    `mainImage` VARCHAR(255) NOT NULL,
    `mainContent` TEXT NOT NULL,
    CONSTRAINT fk_articles_users FOREIGN KEY (`idUser`) REFERENCES users(`id`)
);
-- Comments table
CREATE TABLE `comments` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `text` TEXT(500) NOT NULL,
    `report` BOOLEAN,
    `idUser` INT NOT NULL,
    `idArticle` INT NOT NULL,
    CONSTRAINT fk_comments_users FOREIGN KEY (`idUser`) REFERENCES users(`id`),
    CONSTRAINT fk_comments_articles FOREIGN KEY (`idArticle`) REFERENCES articles(`id`)
);
-- Packages table
CREATE TABLE `packages` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `description` TEXT(500) NOT NULL
);
-- CompletedArticles table
CREATE TABLE `completedArticles` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idUser` INT NOT NULL,
    `idArticle` INT NOT NULL,
    CONSTRAINT fk_completedArticles_users FOREIGN KEY (idUser) REFERENCES users(id),
    CONSTRAINT fk_completedArticles_articles FOREIGN KEY (idArticle) REFERENCES articles(id)
);
-- Bookmarks table
CREATE TABLE `bookmarks` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idUser` INT NOT NULL,
    `idArticle` INT NOT NULL,
    CONSTRAINT fk_bookmarks_users FOREIGN KEY (idUser) REFERENCES users(id),
    CONSTRAINT fk_bookmarks_articles FOREIGN KEY (idArticle) REFERENCES articles(id)
);
-- ArticlesCategories table
CREATE TABLE `articlesCategories` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idArticle` INT NOT NULL,
    `idCategory` INT NOT NULL,
    CONSTRAINT fk_articlesCategories_articles FOREIGN KEY (idArticle) REFERENCES articles(id),
    CONSTRAINT fk_articlesCategories_categories FOREIGN KEY (idCategory) REFERENCES categories(id)
);
-- PackagesCategories table
CREATE TABLE `packagesCategories` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idPackage` INT NOT NULL,
    `idCategory` INT NOT NULL,
    CONSTRAINT fk_packagesCategories_packages FOREIGN KEY (idPackage) REFERENCES packages(id),
    CONSTRAINT fk_packagesCategories_categories FOREIGN KEY (idCategory) REFERENCES categories(id)
);
-- ArticlesPackages table
CREATE TABLE `articlesPackages` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idArticle` INT NOT NULL,
    `idPackage` INT NOT NULL,
    CONSTRAINT fk_articlesPackages_articles FOREIGN KEY (idArticle) REFERENCES articles(id),
    CONSTRAINT fk_articlesPackages_packages FOREIGN KEY (idPackage) REFERENCES packages(id)
);
-- chosenCategories table
CREATE TABLE `chosenCategories` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idUser` INT NOT NULL,
    `idCategory` INT NOT NULL,
    CONSTRAINT fk_chosenCategories_users FOREIGN KEY (idUser) REFERENCES users(id),
    CONSTRAINT fk_chosenCategories_categories FOREIGN KEY (idCategory) REFERENCES categories(id)
);
-- followedPackages table
CREATE TABLE `followedPackages` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idUser` INT NOT NULL,
    `idPackage` INT NOT NULL,
    CONSTRAINT fk_followedPackages_users FOREIGN KEY (idUser) REFERENCES users(id),
    CONSTRAINT fk_followedPackages_packages FOREIGN KEY (idPackage) REFERENCES packages(id)
);
