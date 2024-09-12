# Cadastro de Carro

**RF**

- Deve ser possível cadastrar um novo carro.

**RN**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro, deve ser um administrador.

---

# Listagem de Carros

**RF**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

- O usuário não precisa estar logado no sistema.

---

# Cadastro de Especificação de um Carro

**RF**

- Deve ser possível cadastrar uma especificação para um carro.

**RN**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para um carro.
- O usuário responsável pelo cadastro, deve ser um administrador.

---

# Cadastro de imagens do Carro

**RF**

- Deve ser possível cadastrar a imagem do carro.

**RF**

- Utilizar o multer para upload de arquivos.

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro, deve ser um administrador.

---

# Aluguel de Carro

**RF**

- Deve ser possível cadastrar um aluguel

**RN**

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação
