# ⏰ Configuración de Expiración del Token JWT

## Cambio Realizado

Se ha configurado el tiempo de expiración del token JWT a **20 segundos** para propósitos de prueba y demostración de la funcionalidad de visualización de token.

## Archivos Modificados

### `main.py`

**Línea 7**: Se agregó la importación de `timedelta`
```python
from datetime import timedelta
```

**Líneas 54-55**: Se agregó la configuración del tiempo de expiración
```python
# Configurar tiempo de expiración del token a 20 segundos
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(seconds=20)
```

## Impacto

- ✅ **Tokens nuevos**: Todos los tokens generados después de este cambio expirarán en 20 segundos
- ✅ **Testing**: Perfecto para probar la funcionalidad de expiración y renovación de tokens
- ✅ **Visualización**: Ideal para ver el contador en tiempo real en el modal de información del token

## Cómo Funciona

1. Cuando un usuario inicia sesión, se genera un token JWT
2. El token incluye el campo `exp` (expiration) con una fecha/hora 20 segundos en el futuro
3. El frontend muestra el tiempo restante en el modal de información del token
4. Después de 20 segundos, el token expira automáticamente
5. El backend rechazará cualquier petición con un token expirado (401 Unauthorized)

## Configuraciones Recomendadas para Diferentes Entornos

### Desarrollo (Actual)
```python
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(seconds=20)  # 20 segundos
```

### Testing
```python
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=5)  # 5 minutos
```

### Staging
```python
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)  # 30 minutos
```

### Producción
```python
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # 1 hora
# O usar timedelta(days=1) para 24 horas
```

## Verificar el Cambio

Para verificar que el cambio funciona correctamente:

1. **Reiniciar el servidor Flask**:
   ```bash
   # En la terminal de Python
   python main.py
   ```

2. **Iniciar sesión en el frontend**

3. **Abrir el modal de información del token** (botón verde "Token" en el header)

4. **Observar el contador**: Verás que el tiempo restante comienza en aproximadamente 20 segundos y cuenta hacia atrás

5. **Esperar 20 segundos**: El token debería marcar como "Expirado"

6. **Intentar realizar una acción**: Cualquier petición al backend con el token expirado devolverá un error 401

## Notas Importantes

⚠️ **IMPORTANTE**: Este tiempo de 20 segundos es solo para desarrollo/testing. 

En producción, se recomienda:
- Tokens de acceso: 15-60 minutos
- Implementar refresh tokens para tokens de larga duración
- Configurar renovación automática antes de la expiración

## Reversión

Para volver a un tiempo más largo, simplemente cambia el valor en `main.py`:

```python
# Por ejemplo, para 1 hora:
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# O para 24 horas:
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
```

---

**Fecha del cambio**: 8 de Octubre, 2025
**Motivo**: Prueba y demostración de la funcionalidad de visualización de token en tiempo real
