// Calendário MedTwins — camada única de acesso a dados (repositório).
// Sem window.MT_API_BASE → adaptador LOCAL (protótipo, por navegador).
// Com window.MT_API_BASE = "https://<worker>" → adaptador API (persistência compartilhada via D1).
// Interface: mtData.listEvents/getEvent/saveEvent/deleteEvent/listMovimentos/refresh + mtData.state.
// Notifica a UI via evento 'mt-data-changed' (e 'mt-refresh' para re-render).
(function () {
  const LOCAL_KEY = 'mtCalendarCustomEvents_v1';
  const base = () => (typeof window !== 'undefined' && window.MT_API_BASE) ? String(window.MT_API_BASE).replace(/\/$/, '') : null;
  const notify = () => { try { window.dispatchEvent(new Event('mt-data-changed')); window.dispatchEvent(new Event('mt-refresh')); } catch (e) {} };

  const localAdapter = {
    async listEvents() { try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch (e) { return []; } },
    async saveEvent(rec) {
      const list = await this.listEvents();
      const i = list.findIndex(c => c.id === rec.id);
      if (i >= 0) list[i] = rec; else list.push(rec);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
      return rec;
    },
    async deleteEvent(id) {
      const list = (await this.listEvents()).filter(c => c.id !== id);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
      return true;
    },
    async listMovimentos() { return null; } // null = usar registros canônicos do componente
  };

  const apiAdapter = {
    async _req(path, opts) {
      const res = await fetch(base() + path, { headers: { 'Content-Type': 'application/json' }, ...opts });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { const e = new Error(data.message || data.error || ('HTTP ' + res.status)); e.payload = data; throw e; }
      return data;
    },
    async listEvents() { return (await this._req('/api/acontecimentos')).items; },
    async saveEvent(rec) {
      const isNew = !rec._persisted;
      return this._req('/api/acontecimentos' + (isNew ? '' : '/' + rec.id), { method: isNew ? 'POST' : 'PUT', body: JSON.stringify(rec) });
    },
    async deleteEvent(id) { await this._req('/api/acontecimentos/' + id, { method: 'DELETE' }); return true; },
    async listMovimentos() { return (await this._req('/api/movimentos')).items; }
  };

  const impl = () => base() ? apiAdapter : localAdapter;

  window.mtData = {
    state: 'idle', // idle | loading | saving | error
    lastError: null,
    async listEvents() {
      this.state = 'loading'; this.lastError = null;
      try { const r = await impl().listEvents(); this.state = 'idle'; return r; }
      catch (e) { this.state = 'error'; this.lastError = e; throw e; }
    },
    async saveEvent(rec) {
      this.state = 'saving'; this.lastError = null;
      try { const r = await impl().saveEvent(rec); this.state = 'idle'; notify(); return r; }
      catch (e) { this.state = 'error'; this.lastError = e; throw e; }
    },
    async deleteEvent(id) {
      this.state = 'saving'; this.lastError = null;
      try { await impl().deleteEvent(id); this.state = 'idle'; notify(); return true; }
      catch (e) { this.state = 'error'; this.lastError = e; throw e; }
    },
    async listMovimentos() { return impl().listMovimentos(); },
    refresh: notify,
    usingApi: () => !!base()
  };
})();
