Bienvenid@ a la biblioteca de versiones de Goat-Chan. Aquí podrás encontrar algunas versiones antiguas del bot con las que podrás ver su evolución a lo largo del tiempo. Eres libre de revisar el código del bot; pero si quieres utilizarlo, te dejo unas pautas a seguir ;)

# Sobre Goat-chan

[![](https://img.shields.io/badge/discord.js-v13.1.0-blue.svg?logo=npm)](https://github.com/discordjs)

Goat-chan es un bot multifuncional para tu servidor de discord. Cuenta con comandos de utilidad, diversión, minijuegos... con los que podrás convertir tu servidor en un lugar más ameno. Está programada en el lenguaje de programación *JavaScript*, y tiene su base de datos en *MongoDB*.

# Utilización del código de Goat-Chan para proyectos propios
Tienes dos opciones. La primera, hacer una rama a partir de este repositorio (branch) y ahí programar tu proyecto. otra es descargar el código. Cuando lo hagas, tendrás en tu dispositivo un archivo *.zip* con el código de Goat-chan, que deberás editar en un programa externo como Visual Studio o Notepad++.

**¿Qué necesitas?**
- Un programa de edición de código
- Una base de datos en [MongoDB](https://www.mongodb.com/)
- Una aplicación bot de Discord (ver [Discord Developers](https://discord.com/developers))

**Cómo empezar**

Lo primero es abrir el archivo *config.json*. Verás que hay varias cosas, pero nos centraremos en tres:
- El **prefix**, que debes poner (recomiendo algo como !)
- El **token del bot**, que debes sacar de Discord Developers
- La **clave de MongoDB**, que debes sacar te du base de datos en MongoDB.
Al rellenar esos datos e iniciar tu bot, debería fallar por la existencia de la carpeta de *node_modules*; por lo que te recomiendo hostearla en [Heroku](https://www.heroku.com/), ya que he puesto un archivo *Procfile* diseñado para eso. Al arrancar tu bot de esta manera, debería funcionar.
Ahora sólo tienes que hacer las modificaciones convenientes para darle imagen a tu bot y... ¡ya estaría!
