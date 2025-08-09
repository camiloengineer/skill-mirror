export class Email {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid email format");
    }
    this._value = value.toLowerCase().trim();
  }

  get value(): string {
    return this._value;
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static from(value: string): Email {
    return new Email(value);
  }
}

export class Name {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
    if (value.length > 100) {
      throw new Error("Name is too long");
    }
    this._value = value.trim();
  }

  get value(): string {
    return this._value;
  }

  equals(other: Name): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  static from(value: string): Name {
    return new Name(value);
  }
}

export class Description {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("Description cannot be empty");
    }
    if (value.length > 1000) {
      throw new Error("Description is too long");
    }
    this._value = value.trim();
  }

  get value(): string {
    return this._value;
  }

  equals(other: Description): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  static from(value: string): Description {
    return new Description(value);
  }
}

export class Url {
  private readonly _value: string;

  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error("Invalid URL format");
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: Url): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  private isValid(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static from(value: string): Url {
    return new Url(value);
  }
}
