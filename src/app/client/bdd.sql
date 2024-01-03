CREATE TABLE typefinancement (
    id_financement INT PRIMARY KEY AUTO_INCREMENT,
    nom_financement VARCHAR(100)
);

CREATE TABLE typecredit (
    id_credit INT PRIMARY KEY AUTO_INCREMENT,
    nom_credit VARCHAR(100),
    id_financement INT,
    FOREIGN KEY (id_financement) REFERENCES typefinancement(id_financement)
);

CREATE TABLE client (
    mot_pass VARCHAR(255), -- Assuming passwords are stored as strings (adjust length as needed)
    id_client INT, -- Assuming client ID is an integer
    email VARCHAR(255) -- Assuming email addresses are stored as strings (adjust length as needed)
);

CREATE TABLE particulier (
    id_particulier INT PRIMARY KEY AUTO_INCREMENT,
    id_client INT,
    code_postal VARCHAR(10),
    adresse VARCHAR(100),
    rue VARCHAR(50),
    ville VARCHAR(50),
    nationalite VARCHAR(50),
    genre VARCHAR(10),
    date_naissance DATE,
    prenom VARCHAR(20) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    etat_civil VARCHAR(20),
    additional_info TEXT,
    FOREIGN KEY (id_client) REFERENCES client(id_client)
);

CREATE TABLE pieces_jointe (
    id_piece INT PRIMARY KEY AUTO_INCREMENT,
    id_dossier INT,
    file_name VARCHAR(100),
    file_path VARCHAR(255),
    upload_date DATETIME,
    FOREIGN KEY (id_dossier) REFERENCES dossier(id_dossier)
);

CREATE TABLE dossier (
    id_dossier INT PRIMARY KEY AUTO_INCREMENT,
    id_client INT,
    id_credit INT, -- Added foreign key referencing typecredit table
    description TEXT,
    date_creation DATE,
    FOREIGN KEY (id_client) REFERENCES client(id_client),
    FOREIGN KEY (id_credit) REFERENCES typecredit(id_credit) -- Foreign key reference to typecredit table
);

CREATE TABLE simulation (
    id_simulation INT PRIMARY KEY AUTO_INCREMENT,
    id_dossier INT,
     simulation_data JSON,
    date_simulation DATE,

    FOREIGN KEY (id_dossier) REFERENCES dossier(id_dossier)
);
