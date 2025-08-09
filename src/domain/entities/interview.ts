import { UniqueId } from "../value-objects/unique-id";
import {
  InterviewType,
  InterviewStatus,
  MessageType,
  MessageSender,
} from "../value-objects/enums";
import { Character } from "./character";
import { Company } from "./company";

export interface InterviewMessage {
  id: UniqueId;
  sender: MessageSender;
  type: MessageType;
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface InterviewProps {
  id?: UniqueId;
  character_id: UniqueId;
  company_id: UniqueId;
  type: InterviewType;
  status: InterviewStatus;
  title: string;
  description?: string;
  messages: InterviewMessage[];
  duration_minutes?: number;
  score?: number;
  feedback?: string;
  started_at?: Date;
  ended_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class Interview {
  private readonly _id: UniqueId;
  private _character_id: UniqueId;
  private _company_id: UniqueId;
  private _type: InterviewType;
  private _status: InterviewStatus;
  private _title: string;
  private _description?: string;
  private _messages: InterviewMessage[];
  private _duration_minutes?: number;
  private _score?: number;
  private _feedback?: string;
  private _started_at?: Date;
  private _ended_at?: Date;
  private readonly _created_at: Date;
  private _updated_at: Date;

  constructor(props: InterviewProps) {
    this._id = props.id || UniqueId.generate();
    this._character_id = props.character_id;
    this._company_id = props.company_id;
    this._type = props.type;
    this._status = props.status;
    this._title = props.title;
    this._description = props.description;
    this._messages = props.messages || [];
    this._duration_minutes = props.duration_minutes;
    this._score = props.score;
    this._feedback = props.feedback;
    this._started_at = props.started_at;
    this._ended_at = props.ended_at;
    this._created_at = props.created_at || new Date();
    this._updated_at = props.updated_at || new Date();
  }

  // Getters
  get id(): UniqueId {
    return this._id;
  }

  get character_id(): UniqueId {
    return this._character_id;
  }

  get company_id(): UniqueId {
    return this._company_id;
  }

  get type(): InterviewType {
    return this._type;
  }

  get status(): InterviewStatus {
    return this._status;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get messages(): InterviewMessage[] {
    return [...this._messages];
  }

  get duration_minutes(): number | undefined {
    return this._duration_minutes;
  }

  get score(): number | undefined {
    return this._score;
  }

  get feedback(): string | undefined {
    return this._feedback;
  }

  get started_at(): Date | undefined {
    return this._started_at;
  }

  get ended_at(): Date | undefined {
    return this._ended_at;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  // Business methods
  start(): void {
    if (this._status !== InterviewStatus.PENDING) {
      throw new Error("Interview can only be started from pending status");
    }
    this._status = InterviewStatus.IN_PROGRESS;
    this._started_at = new Date();
    this._updated_at = new Date();
  }

  complete(score?: number, feedback?: string): void {
    if (this._status !== InterviewStatus.IN_PROGRESS) {
      throw new Error(
        "Interview can only be completed from in-progress status"
      );
    }
    this._status = InterviewStatus.COMPLETED;
    this._ended_at = new Date();
    this._score = score;
    this._feedback = feedback;

    if (this._started_at) {
      this._duration_minutes = Math.floor(
        (this._ended_at.getTime() - this._started_at.getTime()) / (1000 * 60)
      );
    }

    this._updated_at = new Date();
  }

  cancel(): void {
    if (this._status === InterviewStatus.COMPLETED) {
      throw new Error("Cannot cancel a completed interview");
    }
    this._status = InterviewStatus.CANCELLED;
    this._ended_at = new Date();
    this._updated_at = new Date();
  }

  addMessage(
    sender: MessageSender,
    type: MessageType,
    content: string,
    metadata?: Record<string, any>
  ): void {
    if (this._status !== InterviewStatus.IN_PROGRESS) {
      throw new Error("Messages can only be added to in-progress interviews");
    }

    const message: InterviewMessage = {
      id: UniqueId.generate(),
      sender,
      type,
      content,
      timestamp: new Date(),
      metadata,
    };

    this._messages.push(message);
    this._updated_at = new Date();
  }

  getLastMessage(): InterviewMessage | undefined {
    return this._messages[this._messages.length - 1];
  }

  getMessagesByType(type: MessageType): InterviewMessage[] {
    return this._messages.filter((message) => message.type === type);
  }

  getMessagesBySender(sender: MessageSender): InterviewMessage[] {
    return this._messages.filter((message) => message.sender === sender);
  }

  getConversationLength(): number {
    return this._messages.filter(
      (message) =>
        message.type === MessageType.TEXT ||
        message.type === MessageType.QUESTION ||
        message.type === MessageType.ANSWER
    ).length;
  }

  isActive(): boolean {
    return this._status === InterviewStatus.IN_PROGRESS;
  }

  isPending(): boolean {
    return this._status === InterviewStatus.PENDING;
  }

  isCompleted(): boolean {
    return this._status === InterviewStatus.COMPLETED;
  }

  isCancelled(): boolean {
    return this._status === InterviewStatus.CANCELLED;
  }

  // Static factory methods
  static create(
    props: Omit<InterviewProps, "id" | "created_at" | "updated_at">
  ): Interview {
    return new Interview({
      ...props,
      status: InterviewStatus.PENDING,
      messages: [],
    });
  }

  static fromPersistence(props: InterviewProps): Interview {
    return new Interview(props);
  }

  // Serialization
  toJSON() {
    return {
      id: this._id.value,
      character_id: this._character_id.value,
      company_id: this._company_id.value,
      type: this._type,
      status: this._status,
      title: this._title,
      description: this._description,
      messages: this._messages.map((msg) => ({
        ...msg,
        id: msg.id.value,
        timestamp: msg.timestamp.toISOString(),
      })),
      duration_minutes: this._duration_minutes,
      score: this._score,
      feedback: this._feedback,
      started_at: this._started_at?.toISOString(),
      ended_at: this._ended_at?.toISOString(),
      created_at: this._created_at.toISOString(),
      updated_at: this._updated_at.toISOString(),
    };
  }
}
