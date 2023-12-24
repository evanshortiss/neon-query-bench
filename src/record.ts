import { PlatformName, QueryRunnerResult, ApplicationConfig, QueryRecordPayload } from "./types"

export function getRecorder (config: ApplicationConfig) {
  const { RECORDER_URL, RECORDER_API_KEY, RECORDER_REQUEST_TIMEOUT} = config

  return async function postBenchResults (payload: QueryRecordPayload) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), RECORDER_REQUEST_TIMEOUT);
    
    const response = await fetch(RECORDER_URL, {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': RECORDER_API_KEY
      },
      signal: controller.signal
    })

    clearTimeout(id);

    if (response.status !== 200) {
      throw new Error(`received ${response.status} from recorder endpoint`)
    }
  }
}
