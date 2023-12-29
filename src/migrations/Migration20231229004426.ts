import { Migration } from '@mikro-orm/migrations';

export class Migration20231229004426 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "files" drop constraint "files_metadata_id_foreign";');
    this.addSql('alter table "files" drop constraint "files_user_id_foreign";');

    this.addSql('alter table "file_metadata" drop constraint "file_metadata_pkey";');
    this.addSql('alter table "file_metadata" rename column "id" to "_id";');
    this.addSql('alter table "file_metadata" add constraint "file_metadata_pkey" primary key ("_id");');

    this.addSql('alter table "users" drop constraint "users_pkey";');
    this.addSql('alter table "users" rename column "id" to "_id";');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("_id");');

    this.addSql('alter table "files" add column "_id" varchar(255) not null, add column "metadata__id" varchar(255) not null, add column "user__id" varchar(255) not null;');
    this.addSql('alter table "files" drop constraint "files_metadata_id_unique";');
    this.addSql('alter table "files" drop constraint "files_pkey";');
    this.addSql('alter table "files" add constraint "files_metadata__id_foreign" foreign key ("metadata__id") references "file_metadata" ("_id") on update cascade;');
    this.addSql('alter table "files" add constraint "files_user__id_foreign" foreign key ("user__id") references "users" ("_id") on update cascade;');
    this.addSql('alter table "files" drop column "id";');
    this.addSql('alter table "files" drop column "metadata_id";');
    this.addSql('alter table "files" drop column "user_id";');
    this.addSql('alter table "files" add constraint "files_metadata__id_unique" unique ("metadata__id");');
    this.addSql('alter table "files" add constraint "files_pkey" primary key ("_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "files" drop constraint "files_metadata__id_foreign";');
    this.addSql('alter table "files" drop constraint "files_user__id_foreign";');

    this.addSql('alter table "file_metadata" drop constraint "file_metadata_pkey";');
    this.addSql('alter table "file_metadata" rename column "_id" to "id";');
    this.addSql('alter table "file_metadata" add constraint "file_metadata_pkey" primary key ("id");');

    this.addSql('alter table "files" add column "id" varchar not null default null, add column "metadata_id" varchar not null default null, add column "user_id" varchar not null default null;');
    this.addSql('alter table "files" drop constraint "files_metadata__id_unique";');
    this.addSql('alter table "files" drop constraint "files_pkey";');
    this.addSql('alter table "files" add constraint "files_metadata_id_foreign" foreign key ("metadata_id") references "file_metadata" ("id") on update cascade on delete no action;');
    this.addSql('alter table "files" add constraint "files_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete no action;');
    this.addSql('alter table "files" drop column "_id";');
    this.addSql('alter table "files" drop column "metadata__id";');
    this.addSql('alter table "files" drop column "user__id";');
    this.addSql('alter table "files" add constraint "files_metadata_id_unique" unique ("metadata_id");');
    this.addSql('alter table "files" add constraint "files_pkey" primary key ("id");');

    this.addSql('alter table "users" drop constraint "users_pkey";');
    this.addSql('alter table "users" rename column "_id" to "id";');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("id");');
  }

}
