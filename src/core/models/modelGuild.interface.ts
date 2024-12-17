export interface IModelGuild {
  guildId: string;
  name: string;
  memberCount: number;
  color: string;
  prefix: string;
  invites: { code: string | null; expires: string | null}[];
  channels: {
    pedirset: {
      id: string | null;
      name: string | null;
    };
    aprovarset: {
      id: string | null;
      name: string | null;
    };
    pd: {
      id: string | null;
      name: string | null;
    }
  };
  roles: {
    entry: {
      id: string | null;
      name: string | null;
    },
    aprover: {
      id: string | null;
      name: string | null;
    }
  };
}
