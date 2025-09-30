Generar el Diagrama Entidad-Relación (DER) desde `docs/er-diagram.puml`

Opciones para generar la imagen (elige una):

1) Usando PlantUML con Docker (recomendado si tienes Docker):

- Comando PowerShell:

```powershell
# Desde la raíz del proyecto
cd C:\Users\ENV\OneDrive\Documentos\practicaservidores\typeorm-uleam-reservas

docker run --rm -v ${PWD}:/workspace plantuml/plantuml:latest \
    -tpng /workspace/docs/er-diagram.puml -o /workspace/docs
```

El resultado será `docs/er-diagram.png`.

2) Usando PlantUML local (JAR):

- Descarga PlantUML y Graphviz si no los tienes.
- Ejecuta en PowerShell:

```powershell
cd C:\Users\ENV\OneDrive\Documentos\practicaservidores\typeorm-uleam-reservas\docs
java -jar path\to\plantuml.jar er-diagram.puml
```

3) Plugins VS Code: instala PlantUML extension y abre `docs/er-diagram.puml`, presiona "Preview" y exporta como PNG/SVG.

Notas:
- El fichero `docs/er-diagram.puml` fue generado automáticamente a partir de los modelos TypeORM del proyecto. Contiene entidades, campos y relaciones FK->PK.
- Si quieres que modifique el diagrama (colores, añadir índices, cardinalidades más explícitas), dime qué formato o detalles prefieres y lo actualizo.
