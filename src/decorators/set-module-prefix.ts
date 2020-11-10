import { PATH_METADATA, MODULE_METADATA } from '@nestjs/common/constants'

const { IMPORTS, CONTROLLERS } = MODULE_METADATA

function resolveController (target: object, controllers: object[] = []) {
  controllers.push(...(Reflect.getMetadata(CONTROLLERS, target) || []))
  const imports = Reflect.getMetadata(IMPORTS, target)
  if (imports) {
    imports.forEach((module: object) => {
      resolveController(module, controllers)
    })
  }
  return controllers
}

export function setModulePrefix (prefix: string) {
  return (target: object) => {
    resolveController(target).forEach(controller => {
      const path = Reflect.getMetadata(PATH_METADATA, controller)
      if (path) {
        Reflect.defineMetadata(PATH_METADATA, prefix + '/' + path.replace(/^\//, ''), controller)
      }
    })
  }
}
