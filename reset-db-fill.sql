INSERT INTO `themes` (name) VALUES ("light"), ("dark");

INSERT INTO `languages` (name) VALUES ("french"), ("english");

INSERT INTO `rights` (level) VALUES ("padawan"), ("knight"), ("master");

INSERT INTO `users` (firstname, lastname, phoneNumber, email, registrationDate, idTheme, idLanguage, idRight) 
VALUES ("Obi-wan", "Kenobi", "006008" ,"email@email.com", DATE(NOW()), 1, 1, 1),
("Antso", "Rakotoson", "0607080910" ,"antso@thevoice.com", "2022-06-02", 1, 2, 1),
("Rémi", "Bordier", "0607088070" ,"remi@gmail.com", "2022-02-06", 1, 2, 3),
("Stefan", "Kolpacoff", "0607809070" ,"stefan@gmail.com", DATE(NOW()), 1, 2, 3),
("Nico", "Vagnoux", "068050601040" ,"nico@gmail.com", NOW(), 1, 2, 3);

INSERT INTO `articles` (title, idUser, mainImage, mainContent) 
VALUES ("La blockchain lecon numéro 1", 2, "https://images.bfmtv.com/LM1M4sRogoV_6p3Tql7AwskEQK8=/96x4:1504x796/1408x0/images/Le-marche-des-cryptomonnaies-atteint-2000-milliards-de-dollars-1006205.jpg", "Une cryptomonnaie repose sur une blockchain, un registre distribué (ou grand livre de comptes), consultable par tous, qui répertorie l'ensemble des actions du réseau depuis l'origine. Les informations à ajouter sont appelées transactions, et sont groupées dans des blocs4. Une transaction peut par exemple être un transfert de cryptomonnaie d'une personne à une autre. Les acteurs du réseau, appelés nœuds, possèdent, stockent et vérifient leurs propres versions de la chaine, depuis le tout premier bloc (appelé bloc genèse). Une blockchain est considérée comme valide lorsqu’il est possible de la vérifier totalement en partant du bloc genèse. Comme il n'y a pas d'autorité centrale ou de tiers de confiance, le système est dit décentralisé. Pour garantir l'immuabilité de la chaine, c'est-à-dire qu'il n'y a pas eu de modification dans un ancien bloc, ceux-ci sont chainés entre eux par des fonctions cryptographiques de hachage. Chaque nœud étant en réalité un ordinateur connecté au réseau par internet, le système n'opère pas en temps réel car il peut y avoir des temps de latence importants lors de l'envoi ou la réception de transactions et blocs à travers le réseau. Dans le cas où différentes versions d'une même chaine existent, la règle est de choisir la chaine valide la plus longue."),
 ("La blockchain lecon numéro 2", 1, "https://images.bfmtv.com/LM1M4sRogoV_6p3Tql7AwskEQK8=/96x4:1504x796/1408x0/images/Le-marche-des-cryptomonnaies-atteint-2000-milliards-de-dollars-1006205.jpg", "Une cryptomonnaie repose sur une blockchain, un registre distribué (ou grand livre de comptes), consultable par tous, qui répertorie l'ensemble des actions du réseau depuis l'origine. Les informations à ajouter sont appelées transactions, et sont groupées dans des blocs4. Une transaction peut par exemple être un transfert de cryptomonnaie d'une personne à une autre. Les acteurs du réseau, appelés nœuds, possèdent, stockent et vérifient leurs propres versions de la chaine, depuis le tout premier bloc (appelé bloc genèse). Une blockchain est considérée comme valide lorsqu’il est possible de la vérifier totalement en partant du bloc genèse. Comme il n'y a pas d'autorité centrale ou de tiers de confiance, le système est dit décentralisé. Pour garantir l'immuabilité de la chaine, c'est-à-dire qu'il n'y a pas eu de modification dans un ancien bloc, ceux-ci sont chainés entre eux par des fonctions cryptographiques de hachage. Chaque nœud étant en réalité un ordinateur connecté au réseau par internet, le système n'opère pas en temps réel car il peut y avoir des temps de latence importants lors de l'envoi ou la réception de transactions et blocs à travers le réseau. Dans le cas où différentes versions d'une même chaine existent, la règle est de choisir la chaine valide la plus longue.");

INSERT INTO `comments` (text, idUser, idArticle)
VALUES ("C'est de la bombe cet article", 4, 1),
("You should delete right now", 2, 2);

INSERT INTO `packages` (name, description) 
VALUES ("Blockchain : qu'est-ce que c'est ?", "voila la description pour le premier package"),
("Enjeux de l'environnement et de la blockchain", "Description du package numéro2");

INSERT INTO `categories` (name, description)
VALUES ("Blockchain", "C'est la blockchain"), ("Développement durable", "C'est le DD"), ("Cryptomonnaie", "C'est les crypto"), ("Finance", "Au service du pognon !"), ("DeFi", "C'est un défi"), ("Ethereum", "C'est l'ether"), ("Solana", "C'est le Sol");

INSERT INTO `bookmarks` (idUser, idArticle) 
VALUES (1, 1), (4, 2), (3, 2), (4, 1);

INSERT INTO followedPackages (idUser, idPackage) 
VALUES (1,1), (1,2), (2,1), (3,2);

INSERT INTO articlesPackages (idPackage, idArticle) 
VALUES (1,2), (2,1), (2,2);

INSERT INTO packagesCategories (idPackage, idCategory)
VALUES (1,1), (1,3), (1,4), (2,2), (2,5);

-- SELECT bookmarks.id AS bookmark_number, users.firstname, users.lastname, articles.title FROM bookmarks INNER JOIN users ON bookmarks.idUser=users.id INNER JOIN articles ON bookmarks.idArticle=articles.id ORDER BY bookmark_number;

