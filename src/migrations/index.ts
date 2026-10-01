import * as migration_20260930_104142_initial from './20260930_104142_initial';
import * as migration_20261001_144437_remove_block_style_and_folder_theme_fields from './20261001_144437_remove_block_style_and_folder_theme_fields';
import * as migration_20261001_154120_articles_layout_seo_popup from './20261001_154120_articles_layout_seo_popup';
import * as migration_20261001_160551_ptoc_article_blocks from './20261001_160551_ptoc_article_blocks';
import * as migration_20261001_181654_remove_hero_faq_entity_list from './20261001_181654_remove_hero_faq_entity_list';
import * as migration_20261001_183635_remove_faq_tny from './20261001_183635_remove_faq_tny';
import * as migration_20261001_184149_tny_article_blocks from './20261001_184149_tny_article_blocks';
import * as migration_20261001_185816_remove_article_plain_editor from './20261001_185816_remove_article_plain_editor';
import * as migration_20261001_185823_body_text_blocks from './20261001_185823_body_text_blocks';

export const migrations = [
  {
    up: migration_20260930_104142_initial.up,
    down: migration_20260930_104142_initial.down,
    name: '20260930_104142_initial',
  },
  {
    up: migration_20261001_144437_remove_block_style_and_folder_theme_fields.up,
    down: migration_20261001_144437_remove_block_style_and_folder_theme_fields.down,
    name: '20261001_144437_remove_block_style_and_folder_theme_fields',
  },
  {
    up: migration_20261001_154120_articles_layout_seo_popup.up,
    down: migration_20261001_154120_articles_layout_seo_popup.down,
    name: '20261001_154120_articles_layout_seo_popup',
  },
  {
    up: migration_20261001_160551_ptoc_article_blocks.up,
    down: migration_20261001_160551_ptoc_article_blocks.down,
    name: '20261001_160551_ptoc_article_blocks',
  },
  {
    up: migration_20261001_181654_remove_hero_faq_entity_list.up,
    down: migration_20261001_181654_remove_hero_faq_entity_list.down,
    name: '20261001_181654_remove_hero_faq_entity_list',
  },
  {
    up: migration_20261001_183635_remove_faq_tny.up,
    down: migration_20261001_183635_remove_faq_tny.down,
    name: '20261001_183635_remove_faq_tny',
  },
  {
    up: migration_20261001_184149_tny_article_blocks.up,
    down: migration_20261001_184149_tny_article_blocks.down,
    name: '20261001_184149_tny_article_blocks',
  },
  {
    up: migration_20261001_185816_remove_article_plain_editor.up,
    down: migration_20261001_185816_remove_article_plain_editor.down,
    name: '20261001_185816_remove_article_plain_editor',
  },
  {
    up: migration_20261001_185823_body_text_blocks.up,
    down: migration_20261001_185823_body_text_blocks.down,
    name: '20261001_185823_body_text_blocks'
  },
];
