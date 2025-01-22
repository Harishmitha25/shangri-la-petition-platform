USE slpp;
SHOW TABLES;
CREATE TABLE bio_ids (
    code VARCHAR(20) NOT NULL PRIMARY KEY,
    used TINYINT(1) DEFAULT 0
);
DESCRIBE bio_ids;

INSERT INTO bio_ids (code, used)
VALUES 
    ('K1YL8VA2HG', 0),
    ('7DMPYAZAP2', 0),
    ('D05HPPQNJ4', 0),
    ('2WYIM3QCK9', 0),
    ('DHKFIYHMAZ', 0),
    ('LZK7P0X0LQ', 0),
    ('H5C98XCENC', 0),
    ('6X6I6TSUFG', 0),
    ('QTLCWUS8NB', 0),
    ('Y4FC3F9ZGS', 0),
    ('V30EPKZQI2', 0),
    ('O3WJFGR5WE', 0),
    ('SEIQTS1H16', 0),
    ('X16V7LFHR2', 0),
    ('TLFDFY7RDG', 0),
    ('PGPVG5RF42', 0),
    ('FPALKDEL5T', 0),
    ('2BIB99Z54V', 0),
    ('ABQYUQCQS2', 0),
    ('9JSXWO4LGH', 0),
    ('QJXQOUPTH9', 0),
    ('GOYWJVDA8A', 0),
    ('6EBQ28A62V', 0),
    ('30MY51J1CJ', 0),
    ('FH6260T08H', 0),
    ('JHDCXB62SA', 0),
    ('O0V55ENOT0', 0),
    ('F3ATSRR5DQ', 0),
    ('1K3JTWHA05', 0),
    ('FINNMWJY0G', 0),
    ('CET8NUAE09', 0),
    ('VQKBGSE3EA', 0),
    ('E7D6YUPQ6J', 0),
    ('BPX8O0YB5L', 0),
    ('AT66BX2FXM', 0),
    ('1PUQV970LA', 0),
    ('CCU1D7QXDT', 0),
    ('TTK74SYYAN', 0),
    ('4HTOAI9YKO', 0),
    ('PD6XPNB80J', 0),
    ('BZW5WWDMUY', 0),
    ('340B1EOCMG', 0),
    ('CG1I9SABLL', 0),
    ('49YFTUA96K', 0),
    ('V2JX0IC633', 0),
    ('C7IFP4VWIL', 0),
    ('RYU8VSS4N5', 0),
    ('S22A588D75', 0),
    ('88V3GKIVSF', 0),
    ('8OLYIE2FRC', 0);
SELECT * FROM bio_ids;
SELECT * FROM bio_ids WHERE code = '7DMPYAZAP2';
SELECT * FROM bio_ids WHERE used = 1;

CREATE TABLE petitioners (
    email VARCHAR(100) PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    password TEXT NOT NULL,
    bioid VARCHAR(20) NOT NULL,
    FOREIGN KEY (bioid) REFERENCES bio_ids(code)
);
SELECT * FROM petitioners;
SELECT * FROM petitioners WHERE email = 'jack@gmail.com';
SELECT * FROM petitioners WHERE email = 'luke@gmail.com';


CREATE TABLE petitions_committee (
    email VARCHAR(100) PRIMARY KEY,
    password TEXT NOT NULL
);


SELECT * FROM petitions_committee;

CREATE TABLE petitions (
    petition_id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('open', 'closed') NOT NULL,
    petition_title VARCHAR(255) NOT NULL,
    petition_text TEXT NOT NULL,
    petitioner VARCHAR(255) NOT NULL,
    signatures INT DEFAULT 0,
    response TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE petitions;
SELECT * FROM petitions;

CREATE TABLE signatures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    petition_id INT NOT NULL,
    signer_email VARCHAR(255) NOT NULL,
    signer_name VARCHAR(255) NOT NULL,
    UNIQUE (petition_id, signer_email),
    FOREIGN KEY (petition_id) REFERENCES petitions(petition_id) ON DELETE CASCADE
);

DESCRIBE signatures;
SELECT * from signatures;
SELECT * FROM signatures WHERE petition_id = 2;

