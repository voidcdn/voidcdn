import { Migration } from '@mikro-orm/migrations';

export class Migration20231229002706 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "file_metadata" ("id" varchar(255) not null, "name" varchar(255) not null, "mimetype" varchar(255) not null, "private" boolean not null, "views" int not null default 0, constraint "file_metadata_pkey" primary key ("id"));');

    this.addSql('create table "users" ("id" varchar(255) not null, "username" varchar(255) not null, "token" varchar(255) not null, "updated_at" varchar(255) not null, "created_at" varchar(255) not null, "upload_key" varchar(255) not null, constraint "users_pkey" primary key ("id"));');

    this.addSql('create table "files" ("id" varchar(255) not null, "metadata_id" varchar(255) not null, "data" bytea not null, "user_id" varchar(255) not null, constraint "files_pkey" primary key ("id"));');
    this.addSql('alter table "files" add constraint "files_metadata_id_unique" unique ("metadata_id");');

    this.addSql('alter table "files" add constraint "files_metadata_id_foreign" foreign key ("metadata_id") references "file_metadata" ("id") on update cascade;');
    this.addSql('alter table "files" add constraint "files_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

}
