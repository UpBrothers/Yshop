const dbconnect = require('./dbcon');

const createtemplate = (schema, callback) => {
  console.log('sdfdsfdsf')

  var sql = [
    `CREATE TABLE Customer (
      ID varchar(16) NOT NULL,
      PW varchar(32) NOT NULL,
      name varchar(16) NOT NULL,
      phone varchar(11) NOT NULL,
      email varchar(32) NOT NULL,
      birthdate date NOT NULL,
      gender varchar(1) NOT NULL,
      address varchar(150) DEFAULT NULL,
      point int NOT NULL DEFAULT '0',
      exp int NOT NULL DEFAULT '0',
      member tinyint NOT NULL DEFAULT '1',
      PRIMARY KEY (ID),
      UNIQUE KEY phone_UNIQUE (phone),
      UNIQUE KEY email_UNIQUE (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Product (
      productPK int NOT NULL AUTO_INCREMENT,
      name varchar(100) NOT NULL,
      price int NOT NULL,
      thumbnail longtext NOT NULL,
      image1 longtext NOT NULL,
      image2 longtext,
      image3 longtext,
      option1 varchar(45) DEFAULT NULL,
      option2 varchar(45) DEFAULT NULL,
      option3 varchar(45) DEFAULT NULL,
      registrationDate datetime NOT NULL,
      status int NOT NULL DEFAULT '0',
      views int NOT NULL DEFAULT '0',
      PRIMARY KEY (productPK),
      UNIQUE KEY name_UNIQUE (name)
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE QnA (
      ID varchar(16) NOT NULL,
      productPK int NOT NULL,
      title varchar(100) NOT NULL,
      context longtext NOT NULL,
      registrationDate datetime NOT NULL,
      answer longtext,
      answerDate datetime DEFAULT NULL,
      flag varchar(45) NOT NULL,
      KEY ProductQnA_idx (productPK),
      KEY ProductQnA2_idx (ID),
      CONSTRAINT QnA1 FOREIGN KEY (ID) REFERENCES Customer (ID),
      CONSTRAINT QnA2 FOREIGN KEY (productPK) REFERENCES Product (productPK)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Stock (
      stockPK int NOT NULL AUTO_INCREMENT,
      productPK int NOT NULL,
      option1PK varchar(45) DEFAULT NULL,
      option2PK varchar(45) DEFAULT NULL,
      option3PK varchar(45) DEFAULT NULL,
      stock int NOT NULL,
      extraCharge int NOT NULL,
      PRIMARY KEY (stockPK),
      KEY stock1_idx (productPK),
      CONSTRAINT Stock1 FOREIGN KEY (productPK) REFERENCES Product (productPK)
    ) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE PurchaseDetail (
      purchasePK int NOT NULL AUTO_INCREMENT,
      ID varchar(16) NOT NULL,
      stockPK int NOT NULL,
      count int NOT NULL,
      purchaseDate datetime NOT NULL,
      point int NOT NULL,
      payMoney int NOT NULL,
      address varchar(150) NOT NULL,
      status int NOT NULL,
      PRIMARY KEY (purchasePK),
      KEY purchase1_idx (ID),
      KEY purchase2_idx (stockPK),
      CONSTRAINT PurchaseDetail1 FOREIGN KEY (ID) REFERENCES Customer (ID),
      CONSTRAINT PurchaseDetail2 FOREIGN KEY (stockPK) REFERENCES Stock (stockPK)
    ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Notice (
      noticePK int NOT NULL AUTO_INCREMENT,
      title varchar(100) NOT NULL,
      image longtext NOT NULL,
      registrationDate datetime NOT NULL,
      isEvent tinyint NOT NULL,
      views int NOT NULL DEFAULT '0',
      PRIMARY KEY (noticePK)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Cart (
      ID varchar(16) NOT NULL,
      stockPK int NOT NULL,
      count int NOT NULL,
      PRIMARY KEY (ID,stockPK),
      KEY cart2_idx (stockPK),
      CONSTRAINT Cart1 FOREIGN KEY (ID) REFERENCES Customer (ID),
      CONSTRAINT Cart2 FOREIGN KEY (stockPK) REFERENCES Stock (stockPK)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';`,
    `CREATE TABLE ` + schema + `.Like (
      ID varchar(16) NOT NULL,
      productPK int NOT NULL,
      PRIMARY KEY (ID,productPK),
      KEY ProductLike1_idx (productPK),
      KEY ProductLike2_idx (ID),
      CONSTRAINT Like1 FOREIGN KEY (ID) REFERENCES Customer (ID),
      CONSTRAINT Like2 FOREIGN KEY (productPK) REFERENCES Product (productPK)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Review (
      purchasePK int NOT NULL,
      title varchar(100) NOT NULL,
      context longtext NOT NULL,
      image longtext,
      star int NOT NULL,
      registrationDate datetime NOT NULL,
      KEY review_idx (purchasePK),
      CONSTRAINT Review1 FOREIGN KEY (purchasePK) REFERENCES PurchaseDetail (purchasePK)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Theme (
      theme int NOT NULL,
      layout1 int NOT NULL DEFAULT '0',
      layout2 int NOT NULL DEFAULT '1',
      layout3 int NOT NULL DEFAULT '2',
      layout4 int NOT NULL DEFAULT '3',
      Image1 longtext,
      Image2 longtext,
      Image3 longtext,
      URL1 longtext,
      URL2 longtext,
      URL3 longtext
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Membership (
      level int NOT NULL,
      name varchar(16) NOT NULL,
      minexp int NOT NULL,
      maxexp int NOT NULL,
      returnRate double NOT NULL,
      PRIMARY KEY (level),
      UNIQUE KEY name_UNIQUE (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='			';`,
    `CREATE TABLE ` + schema + `.Group (
      groupPk int NOT NULL AUTO_INCREMENT,
      groupName varchar(45) NOT NULL,
      depth int NOT NULL,
      parent int DEFAULT NULL,
      PRIMARY KEY (groupPk),
      KEY 1_idx (parent),
      CONSTRAINT p1 FOREIGN KEY (parent) REFERENCES `+ schema + `.Group (groupPk) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Discount (
      discountPK int NOT NULL AUTO_INCREMENT,
      discountName varchar(45) NOT NULL,
      flag int NOT NULL,
      target1 int DEFAULT NULL,
      target2 int DEFAULT NULL,
      dcRate double NOT NULL,
      startDate datetime NOT NULL,
      endDate datetime NOT NULL,
      PRIMARY KEY (discountPK),
      UNIQUE KEY name_UNIQUE (discountName),
      KEY Discount2_idx (target2),
      KEY Discount1 (target1),
      CONSTRAINT Discount1 FOREIGN KEY (target1) REFERENCES `+ schema + `.Group (groupPk),
      CONSTRAINT Discount2 FOREIGN KEY (target2) REFERENCES Product (productPK)
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Component (
      theme int NOT NULL,
      title varchar(45) NOT NULL,
      flag varchar(1) NOT NULL,
      col int NOT NULL,
      tuple int NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Nav (
      navOrder int NOT NULL,
      groupPK int NOT NULL,
      KEY nav1_idx (groupPK),
      CONSTRAINT Nav1 FOREIGN KEY (groupPK) REFERENCES `+ schema + `.Group (groupPk)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`,
    `CREATE TABLE Belong (
      productPK int NOT NULL,
      groupPK int NOT NULL,
      KEY 1_idx (groupPK),
      KEY 2_idx (productPK),
      CONSTRAINT Belong1 FOREIGN KEY (productPK) REFERENCES Product (productPK),
      CONSTRAINT Belong2 FOREIGN KEY (groupPK) REFERENCES `+ schema + `.Group (groupPk)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';`,
    `CREATE TRIGGER PurchaseDetail_AFTER_INSERT AFTER INSERT ON PurchaseDetail FOR EACH ROW BEGIN
      update Stock
        set stock = stock - new.count
        where stockPK = new.stockPK;
    END;`,
    `CREATE TRIGGER Review_AFTER_INSERT AFTER INSERT ON Review FOR EACH ROW BEGIN
      update PurchaseDetail
        set status = 3
        where purchasePK=new.purchasePK;
    END;`,
    `CREATE VIEW `+ schema + `.Group_Nav_View AS
    SELECT 
        `+ schema + `.Group.groupName AS groupName1,
        NULL AS groupName2,
        NULL AS groupName3
    FROM 
      `+ schema + `.Group
    WHERE
        (( `+ schema + `.Group.depth = 1)
            AND `+ schema + `.Group.groupPk IN (SELECT 
              Nav.groupPK
            FROM 
              `+ schema + `.Nav)) 
    UNION SELECT 
        g1.groupName AS groupName1,
        g2.groupName AS groupName2,
        NULL AS groupName3
    FROM
        ((SELECT 
            `+ schema + `.Group.groupPk AS groupPk, 
              `+ schema + `.Group.groupName AS groupName, 
                `+ schema + `.Group.depth AS depth, 
                `+ schema + `.Group.parent AS parent 
        FROM 
              `+ schema + `.Group 
        WHERE
            (( `+ schema + `.Group.depth = 1)
                AND `+ schema + `.Group.groupPk IN (SELECT 
                  Nav.groupPK 
                FROM
                    shop_template.Nav))) g1 
        JOIN (SELECT 
          `+ schema + `.Group.groupPk AS groupPk, 
          `+ schema + `.Group.groupName AS groupName, 
          `+ schema + `.Group.depth AS depth, 
          `+ schema + `.Group.parent AS parent 
        FROM 
          `+ schema + `.Group 
        WHERE
            ( `+ schema + `.Group.depth = 2)) g2)
    WHERE
        (g1.groupPk = g2.parent) 
    UNION SELECT 
        g1.groupName AS groupName1,
        g2.groupName AS groupName2,
        g3.groupName AS groupName3
    FROM
        (((SELECT 
          `+ schema + `.Group.groupPk AS groupPk, 
          `+ schema + `.Group.groupName AS groupName, 
          `+ schema + `.Group.depth AS depth, 
          `+ schema + `.Group.parent AS parent 
        FROM 
          `+ schema + `.Group
        WHERE
            (( `+ schema + `.Group.depth = 1)
                AND `+ schema + `.Group.groupPk IN (SELECT 
                    Nav.groupPK
                FROM 
                `+ schema + `.Nav))) g1
        JOIN (SELECT 
          `+ schema + `.Group.groupPk AS groupPk, 
          `+ schema + `.Group.groupName AS groupName, 
          `+ schema + `.Group.depth AS depth, 
          `+ schema + `.Group.parent AS parent 
        FROM 
        `+ schema + `.Group
        WHERE
            ( `+ schema + `.Group.depth = 2)) g2)
        JOIN (SELECT 
          `+ schema + `.Group.groupPk AS groupPk, 
          `+ schema + `.Group.groupName AS groupName, 
          `+ schema + `.Group.depth AS depth, 
          `+ schema + `.Group.parent AS parent 
        FROM 
        `+ schema + `.Group
        WHERE
            ( `+ schema + `.Group.depth = 3)) g3)
    WHERE
        ((g1.groupPk = g2.parent)
            AND (g2.groupPk = g3.parent));`,

    `insert into `+ schema + `.Group values('1','전체','0',null);`,
    `UPDATE `+ schema + `.Group SET groupPk = '0' WHERE groupPk = '1';`,
    `CREATE 
    VIEW `+ schema + `.Product_Group_View AS
        SELECT 
            `+ schema + `.Belong.productPK AS productPK, 
            `+ schema + `.Group.groupPk AS groupPK1, 
            `+ schema + `.Group.groupName AS groupName1, 
            NULL AS groupPK2,
            NULL AS groupName2,
            NULL AS groupPK3,
            NULL AS groupName3
        FROM
            ( `+ schema + `.Group
            JOIN `+ schema + `.Belong)
        WHERE
            (( `+ schema + `.Group.depth = 1)
                AND ( `+ schema + `.Belong.groupPK = `+ schema + `.Group.groupPk)) 
        UNION SELECT 
            `+ schema + `.Belong.productPK AS productPK,
            g1.groupPk AS groupPK1,
            g1.groupName AS groupName1,
            g2.groupPk AS groupPK2,
            g2.groupName AS groupName2,
            NULL AS groupPK3,
            NULL AS groupName3
        FROM
            (((SELECT 
                `+ schema + `.Group.groupPk AS groupPk, 
                    `+ schema + `.Group.groupName AS groupName, 
                    `+ schema + `.Group.depth AS depth, 
                    `+ schema + `.Group.parent AS parent 
            FROM 
                `+ schema + `.Group
            WHERE
                ( `+ schema + `.Group.depth = 1)) g1
            JOIN (SELECT 
                `+ schema + `.Group.groupPk AS groupPk, 
                    `+ schema + `.Group.groupName AS groupName, 
                    `+ schema + `.Group.depth AS depth, 
                    `+ schema + `.Group.parent AS parent 
            FROM 
                `+ schema + `.Group
            WHERE
                ( `+ schema + `.Group.depth = 2)) g2)
            JOIN `+ schema + `.Belong)
        WHERE
            ((g1.groupPk = g2.parent)
                AND ( `+ schema + `.Belong.groupPK = g2.groupPk)) 
        UNION SELECT 
            `+ schema + `.Belong.productPK AS productPK,
            g1.groupPk AS groupPK1,
            g1.groupName AS groupName1,
            g2.groupPk AS groupPK2,
            g2.groupName AS groupName2,
            g3.groupPk AS groupPK3,
            g3.groupName AS groupName3
        FROM
            ((((SELECT 
                `+ schema + `.Group.groupPk AS groupPk, 
                    `+ schema + `.Group.groupName AS groupName, 
                    `+ schema + `.Group.depth AS depth, 
                    `+ schema + `.Group.parent AS parent
            FROM 
                `+ schema + `.Group
            WHERE
                ( `+ schema + `.Group.depth = 1)) g1
            JOIN (SELECT 
                `+ schema + `.Group.groupPk AS groupPk,
                    `+ schema + `.Group.groupName AS groupName, 
                    `+ schema + `.Group.depth AS depth, 
                    `+ schema + `.Group.parent AS parent 
            FROM 
                `+ schema + `.Group
            WHERE
                ( `+ schema + `.Group.depth = 2)) g2)
            JOIN (SELECT 
                `+ schema + `.Group.groupPk AS groupPk, 
                    `+ schema + `.Group.groupName AS groupName, 
                    `+ schema + `.Group.depth AS depth, 
                    `+ schema + `.Group.parent AS parent 
            FROM 
                `+ schema + `.Group
            WHERE
                ( `+ schema + `.Group.depth = 3)) g3)
            JOIN `+ schema + `.Belong)
        WHERE
            ((g1.groupPk = g2.parent)
                AND (g2.groupPk = g3.parent)
                AND ( `+ schema + `.Belong.groupPK = g3.groupPk));`,
    `CREATE 
      VIEW `+ schema + `.Product_Info_View AS
        SELECT 
            `+ schema + `.Product.productPK AS productPK, 
            `+ schema + `.Product.name AS name, 
            `+ schema + `.Product.price AS price, 
            `+ schema + `.Product.status AS status, 
            `+ schema + `.Product.views AS views, 
            `+ schema + `.Product.thumbnail AS thumbnail, 
            `+ schema + `.Product.registrationDate AS registrationDate, 
            (SUM(g.star) / COUNT(0)) AS star,
            COUNT(0) AS count,
            (SELECT 
                    COUNT(0)
                FROM 
                    `+ schema + `.Like
                WHERE
                    ( `+ schema + `.Like.productPK = `+ schema + `.Product.productPK)) AS likecount,
            (SELECT 
                    SUM( `+ schema + `.Stock.stock)
                FROM 
                    `+ schema + `.Stock
                WHERE
                    ( `+ schema + `.Stock.productPK = `+ schema + `.Product.productPK)
                GROUP BY `+ schema + `.Product.productPK) AS stock,
            d.dcRate AS dcRate
        FROM
            (( `+ schema + `.Product
            LEFT JOIN (SELECT 
                `+ schema + `.Stock.productPK AS productPK, 
                    `+ schema + `.Review.star AS star
            FROM
                (( `+ schema + `.Review
            JOIN `+ schema + `.PurchaseDetail)
            JOIN `+ schema + `.Stock)
            WHERE
                (( `+ schema + `.Review.purchasePK = `+ schema + `.PurchaseDetail.purchasePK)
                    AND ( `+ schema + `.PurchaseDetail.stockPK = `+ schema + `.Stock.stockPK))) g ON (( `+ schema + `.Product.productPK = g.productPK)))
            JOIN (SELECT 
                r.productPK AS productPK,
                    MAX(r.dcRate) AS dcRate
            FROM
                (SELECT 
                p.productPK AS productPK, d.dcRate AS dcRate
            FROM
                ( `+ schema + `.Product p
            JOIN (SELECT 
                MAX( `+ schema + `.Discount.dcRate) AS dcRate
            FROM 
                `+ schema + `.Discount
            WHERE
                ((SYSDATE() BETWEEN `+ schema + `.Discount.startDate AND `+ schema + `.Discount.endDate)
                    AND ( `+ schema + `.Discount.flag = 0))) d) UNION SELECT 
                v.productPK AS productPK, d.dcRate AS dcRate
            FROM
                ( `+ schema + `.Product_Group_View v
            JOIN (SELECT 
                `+ schema + `.Discount.target1 AS target1,
                    MAX( `+ schema + `.Discount.dcRate) AS dcRate
            FROM 
                `+ schema + `.Discount
            WHERE
                ((SYSDATE() BETWEEN `+ schema + `.Discount.startDate AND `+ schema + `.Discount.endDate)
                    AND ( `+ schema + `.Discount.flag = 1))
            GROUP BY `+ schema + `.Discount.target1) d)
            WHERE
                (v.groupPK1 = d.target1) UNION SELECT 
                v.productPK AS productPK, d.dcRate AS dcRate
            FROM
                ( `+ schema + `.Product_Group_View v
            JOIN (SELECT 
                `+ schema + `.Discount.target1 AS target1,
                    MAX( `+ schema + `.Discount.dcRate) AS dcRate
            FROM 
                `+ schema + `.Discount
            WHERE
                ((SYSDATE() BETWEEN `+ schema + `.Discount.startDate AND `+ schema + `.Discount.endDate)
                    AND ( `+ schema + `.Discount.flag = 2))
            GROUP BY `+ schema + `.Discount.target1) d)
            WHERE
                (v.groupPK2 = d.target1) UNION SELECT 
                v.productPK AS productPK, d.dcRate AS dcRate
            FROM
                ( `+ schema + `.Product_Group_View v
            JOIN (SELECT 
                `+ schema + `.Discount.target1 AS target1,
                    MAX( `+ schema + `.Discount.dcRate) AS dcRate
            FROM 
                `+ schema + `.Discount
            WHERE
                ((SYSDATE() BETWEEN `+ schema + `.Discount.startDate AND `+ schema + `.Discount.endDate)
                    AND ( `+ schema + `.Discount.flag = 3))
            GROUP BY `+ schema + `.Discount.target1) d)
            WHERE
                (v.groupPK3 = d.target1) UNION SELECT 
                p.productPK AS productPK, d.dcRate AS dcRate
            FROM
                ( `+ schema + `.Product p
            JOIN (SELECT 
                `+ schema + `.Discount.target2 AS target2,
                    MAX( `+ schema + `.Discount.dcRate) AS dcRate
            FROM 
                `+ schema + `.Discount
            WHERE
                ((SYSDATE() BETWEEN `+ schema + `.Discount.startDate AND `+ schema + `.Discount.endDate)
                    AND ( `+ schema + `.Discount.flag = 4))
            GROUP BY `+ schema + `.Discount.target2) d)
            WHERE
                (p.productPK = d.target2)) r
            GROUP BY r.productPK) d ON (( `+ schema + `.Product.productPK = d.productPK)))
        GROUP BY `+ schema + `.Product.productPK;`,
    `CREATE 
    VIEW `+ schema + `.Cart_View AS
        SELECT 
            c.ID AS ID,
            pv.name AS name,
            pv.thumbnail AS thumbnail,
            pv.price AS price,
            sv.option1PK AS option1,
            sv.option2PK AS option2,
            sv.option3PK AS option3,
            sv.extraCharge AS extraCharge,
            sv.stock AS stock,
            c.count AS count,
            pv.status AS status,
            pv.dcRate AS dcRate
        FROM
            (( `+ schema + `.Cart c
            JOIN `+ schema + `.Stock sv)
            JOIN `+ schema + `.Product_Info_View pv)
        WHERE
            ((c.stockPK = sv.stockPK)
                AND (sv.productPK = pv.productPK));`,
    `CREATE 
    VIEW `+ schema + `.Purchase_List_View AS
        SELECT 
            pd.purchasePK AS purchasePK,
            pd.ID AS ID,
            pv.name AS name,
            pv.thumbnail AS thumbnail,
            pv.price AS price,
            sv.option1PK AS option1,
            sv.option2PK AS option2,
            sv.option3PK AS option3,
            pd.count AS count,
            pd.payMoney AS payMoney,
            pd.point AS point,
            pd.address AS address,
            pd.purchaseDate AS purchaseDate,
            c.gender AS gender,
            c.birthdate AS birthdate,
            gv.groupPK1 AS groupPK1,
            gv.groupPK2 AS groupPK2,
            gv.groupPK3 AS groupPK3,
            pd.status AS status
        FROM
            (((( `+ schema + `.PurchaseDetail pd
            JOIN `+ schema + `.Stock sv)
            JOIN `+ schema + `.Product_Info_View pv)
            JOIN `+ schema + `.Customer c)
            JOIN `+ schema + `.Product_Group_View gv)
        WHERE
            ((c.ID = pd.ID)
                AND (pd.stockPK = sv.stockPK)
                AND (sv.productPK = pv.productPK)
                AND (gv.productPK = pv.productPK));`
  ]
  dbconnect('Y#', (error, { db }) =>
    db.query(`create schema ` + schema,
      function (error, value) {
        dbconnect(schema, (error, { db }) =>
          db.query(sql[0]+sql[1]+sql[2]+sql[3]+sql[4]+sql[5]+sql[6]+sql[7]+sql[8]+sql[9]+sql[10]+sql[11]+sql[12]+sql[13]+sql[14]+sql[15]+sql[16]+sql[17]+sql[18]+sql[19]+sql[20]+sql[21]+sql[22]+sql[23]+sql[24],
            function (error, value) {
              console.log(error)
              callback(undefined, {
                value
              })
            }));
      })
  );
}

module.exports = createtemplate;