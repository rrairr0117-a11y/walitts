# 获取配音库 API 接口文档

## 接口地址

```
GET /voices/tts/{tts_provider_id}
```

---

## 请求参数

| 参数 | 类型 | 位置 | 必填 | 说明 |
|------|------|------|------|------|
| `tts_provider_id` | Integer | Path | ✅ | TTS服务提供商ID（通常为1） |

---

## 请求示例

```bash
GET http://localhost:8300/voices/tts/1
```

---

## 响应格式

```json
{
  "code": 200,
  "message": "查询成功",
  "data": [
    {
      "id": 1,
      "name": "旁白",
      "description": "沉稳、富有磁性的男声，适合故事叙述",
      "reference_path": "voices/narrator_20251210_123456.mp3",
      "tts_provider_id": 1,
      "created_at": "2025-12-10T12:34:56"
    },
    {
      "id": 2,
      "name": "男主角:韩立",
      "description": "年轻、坚毅的男声",
      "reference_path": "voices/hanli_20251210_123457.mp3",
      "tts_provider_id": 1,
      "created_at": "2025-12-10T12:34:57"
    },
    {
      "id": 3,
      "name": "女主角:南宫婉",
      "description": "温柔、知性的女声",
      "reference_path": "voices/nangongwan_20251210_123458.mp3",
      "tts_provider_id": 1,
      "created_at": "2025-12-10T12:34:58"
    }
  ]
}
```

---

## 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | Integer | 音色ID（用于配音接口） |
| `name` | String | 音色名称 |
| `description` | String | 音色描述 |
| `reference_path` | String | 参考音频路径 |
| `tts_provider_id` | Integer | TTS服务提供商ID |
| `created_at` | String | 创建时间 |

---

## 错误响应

```json
{
  "code": 404,
  "message": "TTS服务提供商不存在",
  "data": null
}
```

---

## 使用示例

### Python 示例

```python
import requests

response = requests.get("http://localhost:8300/voices/tts/1")
voices = response.json()['data']

print("可用音色列表：")
for voice in voices:
    print(f"- ID: {voice['id']}, 名称: {voice['name']}, 描述: {voice['description']}")
```

### JavaScript 示例

```javascript
const response = await fetch('http://localhost:8300/voices/tts/1');
const result = await response.json();
const voices = result.data;

console.log('可用音色列表：');
voices.forEach(voice => {
  console.log(`- ID: ${voice.id}, 名称: ${voice.name}, 描述: ${voice.description}`);
});
```

### cURL 示例

```bash
curl -X GET "http://localhost:8300/voices/tts/1"
```

---

## 与智能配音接口配合使用

获取音色列表后，可以在智能配音接口中使用音色ID：

```json
{
  "segments": [
    {
      "type": "dialogue",
      "start_ms": 0,
      "end_ms": 10000,
      "role_name": "旁白",
      "voice_id": 1,
      "text": "这是一段旁白。"
    }
  ],
  "project_id": 1
}
```

**注意**：如果在项目中已经配置了角色与音色的绑定关系，则不需要在segment中指定`voice_id`，系统会自动匹配。

---

## 注意事项

1. **TTS Provider ID**：目前系统默认使用ID为1的TTS服务提供商
2. **音色名称**：在智能配音接口中使用`role_name`时，必须与音色库中的`name`完全一致
3. **音色描述**：用于帮助理解音色特点，建议在配置时填写详细描述
