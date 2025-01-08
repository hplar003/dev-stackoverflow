export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;
  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "Request Error";
  }
}

export class ValidationError extends RequestError {
  constructor(fieldErrors: Record<string, string[]>) {
    // Generate the formatted error message using the static method
    const message = ValidationError.formatFieldErrors(fieldErrors);
    super(400, message, fieldErrors); // Pass the error details to the parent class
    this.name = "ValidationError"; // Set the error name
    this.errors = fieldErrors; // Assign field errors to the instance
  }

  /**
   * Static method to format field errors into a readable string
   */
  static formatFieldErrors(errors: Record<string, string[]>): string {
    const formattedMessages = Object.entries(errors).map(
      ([field, messages]) => {
        const fieldName = field[0].toUpperCase() + field.slice(1); // Capitalize field name
        if (messages[0] === "Required") {
          return `${fieldName} is required`; // Special handling for 'Required' messages
        } else {
          return `${fieldName}: ${messages.join(" and ")}`; // Join other messages
        }
      }
    );
    // Join all formatted messages with a period and space
    return formattedMessages.join(", ");
  }
}

export class NotFoundError extends RequestError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    this.name = "NotFoundError";
  }
}
export class ForbiddenError extends RequestError {
  constructor(message: string = "Forbidden") {
    super(403, message);
    this.name = "ForbiddenError";
  }
}
export class UnauthorizedError extends RequestError {
  constructor(message: string = "Unauthorized") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}
