# Implantação do Software

A implantação do sistema "Lar São Vicente de Paulo" na AWS envolveu várias etapas essenciais para garantir uma configuração eficiente, segura e acessível via web. Abaixo, um resumo do processo e dos cuidados tomados:

### Configuração da Instância EC2
Criação da Instância:
Utilizamos o serviço EC2 da AWS para criar uma instância.

### Configuração de Segurança:

Criamos um grupo de segurança permitindo o tráfego SSH (porta 22), HTTP (porta 80), e HTTPS (porta 443).

### Registro de Domínio:

Registramos um domínio e configuramos uma zona hospedada no Route 53.

### Configuração de DNS:

Criamos um registro A no Route 53 apontando para o IP público da instância EC2, permitindo que o sistema seja acessado via web através do domínio.

### Grupos de Permissões (Security Groups)

Editamos o grupo de segurança para permitir:
Porta 22 (SSH) - Apenas para o IP do administrador.
Porta 80 (HTTP) - Acesso público para o site.
Porta 443 (HTTPS) - Acesso seguro via SSL.

## Cuidados Tomados
### Segurança:

Configuração cuidadosa dos grupos de segurança para limitar acessos não autorizados.
Acesso SSH restrito ao IP do administrador.

### Acessibilidade:

Uso do Route 53 para garantir que o sistema esteja acessível via um domínio amigável.

### Eficiência:

Escolha de uma instância EC2 adequada para as necessidades do sistema, balanceando custo e desempenho.

## Conclusão

O processo de implantação do sistema "Lar São Vicente de Paulo" na AWS foi concluído com sucesso, garantindo que o sistema esteja seguro, eficiente e facilmente acessível via web.
