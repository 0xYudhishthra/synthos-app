/**
 * Service for interacting with the AI agent
 */

const USERNAME = process.env.NEXT_PUBLIC_USERNAME || '';
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD || '';

// Determine if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

// Agent endpoint - use different values based on environment
const AGENT_ENDPOINT = process.env.NEXT_PUBLIC_AI_AGENT || '';


interface AiAgentRequest {
  text: string;
}

interface AiAgentResponseItem {
  user: string;
  text: string;
  action: "CONTINUE" | "END" | string;
}

interface AiAgentResponse {
  response: string;
  metadata?: Record<string, any>;
}

interface AgentLogEntry {
  id: string;
  timestamp: string;
  level: string;
  message: string;
  metadata?: Record<string, any>;
}

/**
 * Send a message to the AI agent and get a response
 */
export async function sendMessageToAgent(message: string, agentId?: string) {
  console.log(`Sending message to agent: ${isDevelopment ? 'Development mode' : 'Production mode'}`);
  console.log(`Using endpoint: ${AGENT_ENDPOINT}`);
  
  try {
    let data;
    if (isDevelopment) {
    // Call the agent (using the appropriate endpoint based on environment)
    const response = await fetch(AGENT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: "user",
        text: message,
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  
    data = await response.json();
    console.log(data);
  }else {
    // Call the agent (using the appropriate endpoint based on environment)
    const response = await fetch(AGENT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       message: message,
       agentId: agentId,
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    

    data = await response.json();
  }
    return data;
  } catch (error) {
    console.error('Error sending message to agent:', error);
    throw error;
  }
}

/**
 * Fetch agent logs from the API
 * @returns Array of agent log entries
 */
export async function fetchAgentLogs() {
  // In development, return empty logs
  if (isDevelopment) {
    console.log('Agent logs not available in development mode');
    return [];
  }
  
  try {
    const response = await fetch('/api/agent-logs');
    if (!response.ok) {
      console.error(`Error fetching agent logs: ${response.status} - ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data.log || [];
  } catch (error) {
    console.error('Error fetching agent logs:', error);
    return [];
  }
}
