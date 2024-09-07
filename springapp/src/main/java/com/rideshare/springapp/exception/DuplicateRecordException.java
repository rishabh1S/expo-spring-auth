package com.rideshare.springapp.exception;

public class DuplicateRecordException extends RuntimeException {

    /**
     * Creates a new instance of <code>DuplicateRecordException</code> without
     * detail message.
     */
    public DuplicateRecordException() {
    }

    /**
     * Constructs an instance of <code>DuplicateRecordException</code> with the
     * specified detail message.
     * 
     * @param msg the detail message.
     */
    public DuplicateRecordException(String msg) {
        super(msg);
    }
}
