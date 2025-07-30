# DNS Setup for poker.blackie.net

## 🎯 Настройка DNS записей

Для подключения домена `poker.blackie.net` к GitHub Pages нужно настроить DNS записи у вашего DNS провайдера.

### 1. A записи (IPv4)

Добавьте следующие A записи в DNS панели вашего провайдера:

```
Type: A
Name: poker
Value: 185.199.108.153
TTL: 3600

Type: A
Name: poker
Value: 185.199.109.153
TTL: 3600

Type: A
Name: poker
Value: 185.199.110.153
TTL: 3600

Type: A
Name: poker
Value: 185.199.111.153
TTL: 3600
```

### 2. CNAME запись (альтернатива)

Если ваш DNS провайдер поддерживает CNAME записи:

```
Type: CNAME
Name: poker
Value: blackie6.github.io
TTL: 3600
```

### 3. Проверка настройки

После настройки DNS подождите 5-15 минут и проверьте:

```bash
# Проверка A записей
dig poker.blackie.net A

# Проверка CNAME записи
dig poker.blackie.net CNAME

# Проверка доступности
curl -I http://poker.blackie.net
```

## 🔧 Настройка в GitHub

### 1. Включить GitHub Pages
- Перейдите в Settings → Pages
- Source: "GitHub Actions"
- Custom domain: `poker.blackie.net`
- Включите "Enforce HTTPS"

### 2. Проверить деплой
- Перейдите в Actions → Deploy to GitHub Pages
- Убедитесь, что деплой прошел успешно

## 🌐 Альтернативные варианты хостинга

### Netlify (Бесплатный)
1. Подключите GitHub репозиторий к Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Custom domain: `poker.blackie.net`

### Vercel (Бесплатный)
1. Подключите GitHub репозиторий к Vercel
2. Framework preset: Vite
3. Custom domain: `poker.blackie.net`

## 📋 Чек-лист

- [ ] Настроены A записи в DNS
- [ ] Включен GitHub Pages
- [ ] Указан кастомный домен
- [ ] Включен HTTPS
- [ ] Прошел успешный деплой
- [ ] Сайт доступен по адресу poker.blackie.net

## 🆘 Если что-то не работает

1. **Проверьте DNS**: `dig poker.blackie.net`
2. **Проверьте деплой**: GitHub Actions → Deploy
3. **Проверьте настройки**: Settings → Pages
4. **Подождите**: DNS изменения могут занять до 24 часов 