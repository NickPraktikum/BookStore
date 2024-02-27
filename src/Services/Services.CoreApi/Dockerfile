#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Services/Services.CoreApi/Services.CoreApi.csproj", "src/Services/Services.CoreApi/"]
COPY ["src/Data/Data.Contexts/Data.Contexts.csproj", "src/Data/Data.Contexts/"]
COPY ["src/Logic/Logic.Models/Logic.Models.csproj", "src/Logic/Logic.Models/"]
COPY ["src/Data/Data.Configurations/Data.Configurations.csproj", "src/Data/Data.Configurations/"]
COPY ["src/Data/Data.Interceptors/Data.Interceptors.csproj", "src/Data/Data.Interceptors/"]
COPY ["src/Logic/Logic.Interfaces/Logic.Interfaces.csproj", "src/Logic/Logic.Interfaces/"]
COPY ["src/Logic/Logic.Common/Logic.Common.csproj", "src/Logic/Logic.Common/"]
COPY ["src/Logic/Logic.Core/Logic.Core.csproj", "src/Logic/Logic.Core/"]
COPY ["src/Logic/Logic.Repositories/Logic.Repositories.csproj", "src/Logic/Logic.Repositories/"]
RUN dotnet restore "./src/Services/Services.CoreApi/./Services.CoreApi.csproj"
COPY . .
WORKDIR "/src/src/Services/Services.CoreApi"
RUN dotnet build "./Services.CoreApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Services.CoreApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookStore.Services.CoreApi.dll"]