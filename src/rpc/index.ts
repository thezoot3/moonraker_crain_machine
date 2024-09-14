export interface RPCRequest {
  method: string
  params?: { [key: string]: never }
  id: number
  jsonrpc: string
}

export interface RPCResponse {
  result: { [key: string]: never } | null
  error: { [key: string]: never } | null
  id: number
  jsonrpc: string
}

export async function sendRPC(req: RPCRequest): Promise<RPCResponse | null> {
  try {
    const data = await fetch(`http://localhost:7125/server/jsonrpc`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await data.json()
    if (json) {
      console.log(json)
      return json as RPCResponse
    }
  } catch (e) {
    console.log(e)
  }
  return null
}
