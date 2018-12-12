# Configurar Sistema Localmente
Sistema EndoClinica


## Requisitos
- Python 3.7.0
- VirtualEnv
- Pip
- PostgresSQL
  
  https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04

## Instalação do Ambiente

### Requisitos
  Teste o funcionamento e versão dos requisitos
  
### Clone este repositório
  Clone este repositório na pasta desejada
  
### Configure o virtual enviroment
  Entre na pasta do repositório e execute comando abaixo no terminal. Este comando irá criar um ambiente virtual python com nome env na diretorio onde for executado o comando
  ```
  virtualenv env .
  ```
  
  Em seguida execute o comando abaixo. Este irá inicializar o ambiente virtual no terminal que o comando for executado.
  ```
  source env/bin/activate
  ```
  
### Instalar pacotes
  Agora instale os pacotes do projeto salvos no arquivo requiments.txt usando o comando abaixo.
  ```
  pip install -r requirements.txt
  ```
  
### Configurar Servidor
  Entre no ambiente de gerenciamento de db do postgressql
  ```
  sudo su - postgres
  psql
  ```
  
  Crie o DB
  ```
  CREATE DATABASE endoclinica;
  ```
  
  Crie o Usuário para o servidor utilizar o DB
  ```
  CREATE USER endosisuser WITH PASSWORD 'bananatastico3516';
  ```
  
  Ajuste o usuário para que seja compatível com o que o Django espera
  ```
  ALTER ROLE endosisuser SET client_encoding TO 'utf8';
  ALTER ROLE endosisuser SET default_transaction_isolation TO 'read committed';
  ALTER ROLE endosisuser SET timezone TO 'UTC';
  ```
  
  Dé todas as permições de uso deste user sobre o novo DB
  ```
  GRANT ALL PRIVILEGES ON DATABASE endoclinica TO endosisuser;
  ```
  
  Para sair
  ```
  \q
  exit
  ```
  Devolta ao virtual enviroment do seu projeto e em seu diretorio, execute as migrações do Django
  ```
  python manage migrate
  ```
  
### Fim
  Todo já deve estar funcionando, execute o servidor com o comando abaixo para criar um super user e preencha como o console pedir
  ```
  python manage createsuperuser
  ```
  Só falta testar
  ```
  python manage runserver
  ```
  
# Copiar server do heroku


## Faça um novo servidor
Crie o novo servidor utilizando a branch que está sendo usada no servidor a ser copiado.
  
## Copie o Banco
### Faça um backup do servidor
Crie um backup do DB, entrando no terminal de admin do Postgresql. Entre na aba Durability e crie uma cópia manual do DB.
    
### Instancie o backup no novo server
    
Vá ao terminal do seu SO e faça login.
    
Agora execute o comando
    
```
heroku pg:backups:restore {{nome do app heroku que será copiado}}::{{nome do backup}} DATABASE_URL --app {{nome do novo servidor}}
```
