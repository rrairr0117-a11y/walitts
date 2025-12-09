/**
 * 自动检测并解码 UTF-8 或 GBK 编码的文本
 * @param {ArrayBuffer} arrayBuffer - 文件二进制数据
 * @returns {{encoding: string, text: string}} - 编码类型和解码后的文本
 */
export function decodeUtf8OrGbk(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  
  // 1. 优先尝试 UTF-8 解码（严格模式）
  try {
    const utf8Decoder = new TextDecoder('utf-8', { fatal: true });
    const text = utf8Decoder.decode(uint8Array);
    
    // 检查是否包含替换字符（�），如果没有说明 UTF-8 解码成功
    if (!text.includes('\uFFFD')) {
      return { encoding: 'UTF-8', text };
    }
  } catch (e) {
    // UTF-8 严格解码失败，继续尝试 GBK
  }
  
  // 2. 尝试 GBK 解码（Windows 中文常用编码）
  try {
    const gbkDecoder = new TextDecoder('gbk');
    const text = gbkDecoder.decode(uint8Array);
    return { encoding: 'GBK', text };
  } catch (e) {
    console.warn('GBK decoding failed:', e);
  }
  
  // 3. 兜底：使用宽松的 UTF-8 解码（允许错误字符）
  const fallbackDecoder = new TextDecoder('utf-8', { fatal: false });
  const text = fallbackDecoder.decode(uint8Array);
  return { encoding: 'UTF-8 (fallback)', text };
}
