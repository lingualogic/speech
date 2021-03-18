/** @packageDocumentation
 * ServiceLock zum synchronisieren von Services
 *
 * Last Change: 28.10.2020
 * Quality Status: red
 *
 * @module service
 */


// service

import { EventEmitter } from './event-emitter';


/**
 * ServiceLock
 *
 * @export
 * @class ServiceLock
 */

export class ServiceLock {

    private mLockServiceName = '';

    private mLockEvent = new EventEmitter<string>();
    private mUnlockEvent = new EventEmitter<string>();

    constructor() {}

    // event funcktions

    get lockEvent() {
        return this.mLockEvent;
    }

    get unlockEvent() {
        return this.mUnlockEvent;
    }

    /**
     * check, if Lock
     */

    isLock(): boolean {
        if ( this.mLockServiceName ) {
            return true;
        }
        return false;
    }

    /**
     * get Lock Service name
     */

    getLockServiceName(): string {
        return this.mLockServiceName;
    }

    /**
     * Lock speech service
     *
     * @param aServiceName - Name of the active Speech-Service
     *
     * @return true, if lock, false else
     */

    lock( aServiceName: string ): boolean {
        if ( !this.mLockServiceName ) {
            this.mLockServiceName = aServiceName;
            this.mLockEvent.emit( aServiceName );
            return true;
        }
        return false;
    }

    /**
     * Unlock speech service
     *
     * @param aServiceName - Name of active Speech-Service
     *
     * @return true, if lock, false else
     */
    unlock( aServiceName: string ): boolean {
        if ( this.mLockServiceName === aServiceName ) {
            this.mLockServiceName = '';
            this.mUnlockEvent.emit( aServiceName );
            return true;
        }
        return false;
    }

    /**
     * Force lock
     */

    forceLock( aServiceName: string ): void {
        if ( this.mLockServiceName ) {
            this.forceUnlock();
        }
        this.lock( aServiceName );
    }

    /**
     * Force unlock
     */

    forceUnlock(): void {
        if ( this.mLockServiceName ) {
            const name = this.mLockServiceName;
            this.mLockServiceName = '';
            this.unlockEvent.emit( name );
        }
    }

}
