const util = require('util');

/**
 * @brief An object used to track whether registered events happen.
 * If no actions happen in a given time period, the tracker invokes @arg idleAction
 */
class ActionTracker {
    /**
     * @param {timeout in **seconds**} timeout_in_s
     * @param {action to take when timeout} timeout_action 
     * @param {actions to track} tracked_actions 
     */
    constructor(timeout_in_s, timeout_action) {
        this.m_timeout_in_ms = timeout_in_s * 1000;
        this.m_timeout_action = timeout_action;
        this.startTimer();
    }

    registerAction(action) {
        return (...args) => {
            this.cancelTimer();
            action(...args);
            this.startTimer();
        }
    }

    startTimer() {
        this.m_cancellableTimeout = setCancellableTimeout(this.m_timeout_action, this.m_timeout_in_ms);
    }

    cancelTimer() {
        this.m_cancellableTimeout.cancel();
    }

    wait() {
        return this.m_cancellableTimeout.timer;
    }

}

function setCancellableTimeout(timeout_action, timeout_in_ms) {
    let timeout_obj;
    timeout_promise = new Promise((resolve, reject) => {
        timeout_obj = setTimeout(() => {
            timeout_action();
            resolve();
        }, timeout_in_ms);

    });
    return {
        timer: timeout_promise,
        cancel: () => { clearTimeout(timeout_obj); }
    }
}

module.exports = ActionTracker;