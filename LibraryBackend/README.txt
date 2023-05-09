1.
To connect local db you have to change connection string ===>
"Data Source=(SERVER_NAME);Initial Catalog=(DATABASE_NAME);Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
appsettings.json => "DevConnection"