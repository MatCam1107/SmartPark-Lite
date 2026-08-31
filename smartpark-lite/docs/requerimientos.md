\# Requerimientos de SmartPark Lite



\## Requisitos funcionales



| ID | Requerimiento funcional | Prioridad | Impacto arquitectónico |

|---|---|---|---|

| RF01 | Registrar un usuario. | Alta | ms-usuario + BD |

| RF02 | Consultar y actualizar información de un usuario. | Media | ms-usuario |

| RF03 | Registrar un vehículo asociado a un usuario. | Alta | ms-vehiculo + BD |

| RF04 | Consultar y actualizar información de un vehículo. | Media | ms-vehiculo |

| RF05 | Consultar estacionamientos disponibles. | Alta | ms-estacionamiento |

| RF06 | Consultar el estado de un estacionamiento. | Alta | ms-estacionamiento |

| RF07 | Asignar un estacionamiento a un vehículo. | Alta | ms-estacionamiento + ms-vehiculo |

| RF08 | Consultar la ubicación de un estacionamiento. | Alta | ms-ubicacion |

| RF09 | Actualizar la disponibilidad de un estacionamiento después de una operación. | Alta | ms-estacionamiento |

| RF10 | Generar y enviar notificaciones ante eventos relevantes del sistema. | Media | ms-notificacion - eventos |



\## Requisitos no funcionales



| ID | Requisito no funcional | Necesidad | Prioridad | Decisión arquitectónica |

|---|---|---|---|---|

| RNF01 | El sistema debe permitir escalar independientemente los microservicios según su demanda. | Escalabilidad | Alta | Microservicios independientes |

| RNF02 | El sistema debe mantener disponibilidad ante fallas aisladas de un microservicio. | Disponibilidad | Alta | Circuit Breaker |

| RNF03 | La comunicación entre cliente y sistema debe utilizar HTTPS. | Comunicación segura | Alta | HTTPS/TLS |

| RNF04 | El sistema debe autenticar y autorizar el acceso a las funcionalidades protegidas. | Seguridad | Alta | Autenticación + autorización |

| RNF05 | Los datos almacenados deben estar protegidos contra accesos no autorizados. | Protección de datos | Alta | BD independientes + controles de acceso |

| RNF06 | Los microservicios deben mantenerse desacoplados y con responsabilidades independientes. | Bajo acoplamiento | Alta | Responsabilidades separadas + APIs |

| RNF07 | Las consultas principales deben responder en un tiempo adecuado para el usuario. | Rendimiento | Media | API Gateway + comunicación eficiente |

| RNF08 | El sistema debe permitir monitorear errores y disponibilidad de los servicios. | Observabilidad | Media | Monitoreo + logs + métricas |

