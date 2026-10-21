winget install -e --id OpenJS.NodeJS.LTS Нужно скачать node.js
Нужно добавить путь в изменеие системных параметров среды -> перменные среды -> нижнее создать -> полный путь до node js

```
dotnet new webapi -n HybridApp.Server
cd HybridApp.Server

# Создаем React-клиент (используя Vite)
npm create vite@latest ClientApp/react -- --template react-ts
cd ClientApp/react
npm install
cd ../../

# Создаем Angular-клиент
npx @angular/cli new ClientApp/angular --routing --style=css
cd ClientApp/angular
npm install
cd ../../
```

```c#
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles(); // Разрешает раздачу файлов из wwwroot

app.UseRouting();

// API маршруты (будут использоваться обоими фронтендами)
app.MapControllers();

// --- ГРАНИЦА REACT ---
// Все, что не начинается с /angular и не является API, обрабатывается React-приложением.
// В production: отдает wwwroot/index.html (собранный React).
// В development: ASP.NET Core SPA Proxy перенаправит на Vite Dev Server.
app.MapFallbackToFile("/react/{path}", "react/index.html");

// --- ГРАНИЦА ANGULAR ---
// Все запросы, начинающиеся с /angular, обрабатываются Angular-модулем.
app.MapFallbackToFile("/angular/{path}", "angular/index.html");

app.Run();
```

### .csproj
<Project Sdk="Microsoft.NET.Sdk.Web">

  <!-- ... стандартные свойства ... -->

  <!-- Таргет для сборки React при публикации -->
  <Target Name="PublishReact" AfterTargets="ComputeFilesToPublish">
    <Exec WorkingDirectory="ClientApp/react" Command="npm install" />
    <Exec WorkingDirectory="ClientApp/react" Command="npm run build" />
    <!-- Копируем артефакты Vite (папка dist) в wwwroot/react -->
    <ItemGroup>
      <ReactFiles Include="ClientApp/react/dist/" />
    </ItemGroup>
    <Copy SourceFiles="@(ReactFiles)" DestinationFolder="$(PublishDir)wwwroot/react/%(RecursiveDir)" />
  </Target>

  <!-- Таргет для сборки Angular при публикации -->
  <Target Name="PublishAngular" AfterTargets="ComputeFilesToPublish">
    <Exec WorkingDirectory="ClientApp/angular" Command="npm install" />
    <Exec WorkingDirectory="ClientApp/angular" Command="ng build --configuration production" />
    <!-- Angular по умолчанию собирает в dist/<name>/browser -->
    <ItemGroup>
      <AngularFiles Include="ClientApp/angular/dist/angular/browser/" />
    </ItemGroup>
    <Copy SourceFiles="@(AngularFiles)" DestinationFolder="$(PublishDir)wwwroot/angular/%(RecursiveDir)" />
  </Target>

</Project>

### React /vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Все запросы к /api идут на ASP.NET Core
      '/api': {
        target: 'https://localhost:7000', // Порт вашего ASP.NET Core
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/', // React живет в корне
})
```
### Angular /proxy.conf.json
```json
{
  "/api": {
    "target": "https://localhost:7000",
    "secure": false,
    "changeOrigin": true
  },
  "/angular": {
    "target": "http://localhost:4200",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": { "^/angular": "" }
  }
}
```

### program.cs добавить авторизацию
```c#
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "SharedAuth";
        options.Cookie.Path = "/"; // Кука доступна и для /, и для /angular
    });

// После app.UseRouting() и перед app.MapControllers():
app.UseAuthentication();
app.UseAuthorization();
```