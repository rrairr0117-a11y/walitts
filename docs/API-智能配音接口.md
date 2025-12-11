# 智能配音 API 接口文档

## 接口地址

```
POST /tts/timeline/dubbing
```

---

## 请求体格式

### 同步模式（默认）

```json
{
  "segments": [
    {
      "type": "dialogue",
      "start_ms": 0,
      "end_ms": 10000,
      "role_name": "旁白",
      "text": "破旧的茅草屋里，十岁的韩立睁大双眼，望着漏光的黑屋顶。",
      "emotion": "叙述",
      "strength": "轻柔"
    },
    {
      "type": "silence",
      "start_ms": 10000,
      "end_ms": 10500
    },
    {
      "type": "dialogue",
      "start_ms": 10500,
      "end_ms": 20000,
      "role_name": "男主角:韩立",
      "text": "我一定要走出这个村子，去看看外面的世界。",
      "emotion": "向往",
      "strength": "中等"
    }
  ],
  "project_id": 1,
  "return_srt": true,
  "async_mode": false
}
```

### 异步模式

```json
{
  "segments": [ ... ],
  "project_id": 1,
  "return_srt": true,
  "async_mode": true
}
```

---

## 请求参数说明

### 主要参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `segments` | Array | ✅ | - | 时间轴片段数组 |
| `project_id` | Integer | ✅ | - | 项目ID |
| `return_srt` | Boolean | ❌ | true | 是否返回字幕文件 |
| `async_mode` | Boolean | ❌ | false | 是否异步处理 |

### Segment 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | String | ✅ | 片段类型：`dialogue` 或 `silence` |
| `start_ms` | Integer | ✅ | 开始时间（毫秒） |
| `end_ms` | Integer | ✅ | 结束时间（毫秒） |
| `role_name` | String | ⚠️ | 角色名称（dialogue类型必填） |
| `text` | String | ⚠️ | 台词内容（dialogue类型必填） |
| `emotion` | String | ❌ | 情绪（可选） |
| `strength` | String | ❌ | 强度（可选） |

### 可用情绪选项

```
叙述、平静、高兴、悲伤、愤怒、惊讶、恐惧、紧张、温柔、严肃、调侃、神秘、深沉、激动、向往
```

### 可用强度选项

```
轻柔、中等、强烈、深沉
```

---

## 响应格式

### 同步模式响应

```json
{
  "code": 200,
  "message": "配音生成成功",
  "data": {
    "task_id": "timeline_20251211_133045_123456",
    "audio_url": "/output/timeline/chapter_001/merged.wav",
    "local_audio_url": "http://localhost:8300/output/timeline/chapter_001/merged.wav",
    "srt_url": "/output/timeline/chapter_001/merged.srt",
    "local_srt_url": "http://localhost:8300/output/timeline/chapter_001/merged.srt",
    "duration_ms": 141411,
    "actual_duration_ms": 141411,
    "speed_ratio": 1.0,
    "segment_count": 15,
    "dialogue_count": 12,
    "silence_count": 3,
    "srt_content": "1\n00:00:00,000 --> 00:00:10,000\n破旧的茅草屋里..."
  }
}
```

### 异步模式响应

```json
{
  "code": 200,
  "message": "任务已创建，正在后台处理",
  "data": {
    "task_id": "timeline_20251211_133045_123456",
    "status": "pending",
    "message": "任务已提交，请使用task_id查询进度"
  }
}
```

---

## 响应字段说明

### 同步模式字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `task_id` | String | 任务唯一标识 |
| `audio_url` | String | 音频文件相对路径 |
| `local_audio_url` | String | 音频文件完整URL |
| `srt_url` | String | 字幕文件相对路径 |
| `local_srt_url` | String | 字幕文件完整URL |
| `duration_ms` | Integer | 目标时长（毫秒） |
| `actual_duration_ms` | Integer | 实际时长（毫秒） |
| `speed_ratio` | Float | 变速倍数 |
| `segment_count` | Integer | 总片段数 |
| `dialogue_count` | Integer | 对话片段数 |
| `silence_count` | Integer | 静音片段数 |
| `srt_content` | String | 字幕内容（如果return_srt=true） |

### 异步模式字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `task_id` | String | 任务唯一标识 |
| `status` | String | 任务状态：pending, processing, completed, failed |
| `message` | String | 状态说明 |

---

## 查询任务状态（异步模式）

### 接口地址

```
GET /tts/timeline/task/{task_id}
```

### 响应示例

```json
{
  "code": 200,
  "message": "查询成功",
  "data": {
    "task_id": "timeline_20251211_133045_123456",
    "task_type": "timeline_dubbing",
    "status": "completed",
    "progress": 100,
    "message": "配音生成成功",
    "result": {
      "audio_url": "/output/timeline/chapter_001/merged.wav",
      "srt_url": "/output/timeline/chapter_001/merged.srt",
      "duration_ms": 141411
    },
    "created_at": "2025-12-11T13:30:45",
    "updated_at": "2025-12-11T13:31:20"
  }
}
```

---

## 错误响应

```json
{
  "code": 400,
  "message": "请求参数错误：segments不能为空",
  "data": null
}
```

```json
{
  "code": 500,
  "message": "配音生成失败：音频处理错误",
  "data": null
}
```

---

## 使用示例

### Python 示例

```python
import requests

# 同步模式
response = requests.post(
    "http://localhost:8300/tts/timeline/dubbing",
    json={
        "segments": [
            {
                "type": "dialogue",
                "start_ms": 0,
                "end_ms": 10000,
                "role_name": "旁白",
                "text": "这是一段旁白。",
                "emotion": "叙述",
                "strength": "中等"
            }
        ],
        "project_id": 1,
        "return_srt": True,
        "async_mode": False
    }
)

result = response.json()
print(f"音频URL: {result['data']['local_audio_url']}")
```

### JavaScript 示例

```javascript
// 异步模式
const response = await fetch('http://localhost:8300/tts/timeline/dubbing', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    segments: [
      {
        type: 'dialogue',
        start_ms: 0,
        end_ms: 10000,
        role_name: '旁白',
        text: '这是一段旁白。',
        emotion: '叙述',
        strength: '中等'
      }
    ],
    project_id: 1,
    return_srt: true,
    async_mode: true
  })
});

const result = await response.json();
const taskId = result.data.task_id;

// 查询任务状态
const statusResponse = await fetch(`http://localhost:8300/tts/timeline/task/${taskId}`);
const status = await statusResponse.json();
console.log('任务状态:', status.data.status);
```

---

## 注意事项

1. **时间轴连续性**：所有segment的时间必须连续，不能有间隙或重叠
2. **时间单位**：所有时间参数使用毫秒（ms）
3. **角色名称**：必须与项目中配置的角色名称完全一致
4. **情绪和强度**：如果不提供，系统会使用默认值
5. **同步vs异步**：
   - 同步模式：适合短时长配音（<2分钟），立即返回结果
   - 异步模式：适合长时长配音（>2分钟），需要轮询查询状态
