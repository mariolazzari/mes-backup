# mes-backup

## Database

### Utenti

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  totp_secret TEXT
);
```

### Unità di misura

```sql
CREATE TABLE um (
    cod CHAR(4) PRIMARY KEY,
    descrizione TEXT
);
```

### Registrazioni

| Campo             | Tipo         | Note                                          |
| ----------------- | ------------ | --------------------------------------------- |
| Id                | Number(10)   |                                               |
| ODP               | Char(20)     | Tutto maiuscolo                               |
| Fase              | Char(4)      |                                               |
| Prodotto          | Char(20)     | Tutto Maiuscolo                               |
| UM_PROD           | CHAR(4)      | LISTA UM SELEZIONABIL.                        |
| Qta prodotta      | Number(15,3) |                                               |
| HU_prod_ok        | Char(20)     |                                               |
| Qta Scartata      | Number(15,3) |                                               |
| HU_scarto         | Char(20)     |                                               |
| Data e ora inizio | DateTime     |                                               |
| Date e ora fine   | Datetime     |                                               |
| Componente        | Char(20)     |                                               |
| HU_Comp           | Char(20)     |                                               |
| Flag_HU_Comp      | Char(1)      | Y/N default Se Y significa che la HU è finita |
| Um_CONS           | CHAR(4)      | LISTA UM SELEZIONABIL.                        |
| Qta_cons          | Number(15,3) |

```sql
CREATE TABLE prod (
    id                INTEGER PRIMARY KEY,
    odp               CHAR(20) NOT NULL,
    fase              CHAR(4),
    prodotto          CHAR(20) NOT NULL,
    um_prod           CHAR(4) REFERENCES um(cod),
    qta_prodotta      NUMERIC(15,3),
    hu_prod_ok        CHAR(20),
    qta_scartata      NUMERIC(15,3),
    hu_scarto         CHAR(20),
    data_ora_inizio   TIMESTAMP,
    data_ora_fine     TIMESTAMP,
    componente        CHAR(20),
    hu_comp           CHAR(20),
    flag_hu_comp      CHAR(1) DEFAULT 'N'
                      CHECK (flag_hu_comp IN ('Y','N')),
    um_cons           CHAR(4) REFERENCES um(cod),
    qta_cons          NUMERIC(15,3)
);
```

#### Triggers

```sql
CREATE OR REPLACE FUNCTION enforce_uppercase()
RETURNS TRIGGER AS $$
BEGIN
    NEW.odp := UPPER(NEW.odp);
    NEW.prodotto := UPPER(NEW.prodotto);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_uppercase
BEFORE INSERT OR UPDATE ON prod
FOR EACH ROW
EXECUTE FUNCTION enforce_uppercase();
```
