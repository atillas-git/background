import { Job, JobStatus } from "../types";

export interface QueueEventData {
  job?: Job;
  status?: JobStatus;
  message?: string;
}

// Extend standard Event with our custom data
export class QueueEvent extends Event {
  public readonly data: QueueEventData;
  constructor(type: string, data: QueueEventData) {
    super(type);
    this.data = data;
  }
}

// Add type declaration for event listeners to fix TypeScript errors
declare global {
  interface EventListenerObject {
    handleEvent(evt: Event | QueueEvent): void;
  }

  interface EventTarget {
    addEventListener(
      type: string,
      callback: EventListener | ((evt: QueueEvent) => void),
      options?:
        | boolean
        | { capture?: boolean; once?: boolean; passive?: boolean },
    ): void;
  }
}
