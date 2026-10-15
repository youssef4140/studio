import * as migration_20260930_104142_initial from './20260930_104142_initial';
import * as migration_20261001_144437_remove_block_style_and_folder_theme_fields from './20261001_144437_remove_block_style_and_folder_theme_fields';
import * as migration_20261001_154120_articles_layout_seo_popup from './20261001_154120_articles_layout_seo_popup';
import * as migration_20261001_160551_ptoc_article_blocks from './20261001_160551_ptoc_article_blocks';
import * as migration_20261001_181654_remove_hero_faq_entity_list from './20261001_181654_remove_hero_faq_entity_list';
import * as migration_20261001_183635_remove_faq_tny from './20261001_183635_remove_faq_tny';
import * as migration_20261001_184149_tny_article_blocks from './20261001_184149_tny_article_blocks';
import * as migration_20261001_185816_remove_article_plain_editor from './20261001_185816_remove_article_plain_editor';
import * as migration_20261001_185823_body_text_blocks from './20261001_185823_body_text_blocks';
import * as migration_20261005_131115_ptoc_page_blocks from './20261005_131115_ptoc_page_blocks';
import * as migration_20261007_144105_ptoc_text_editor_on_pages from './20261007_144105_ptoc_text_editor_on_pages';
import * as migration_20261012_152941_add_cob_hero_blocks from './20261012_152941_add_cob_hero_blocks';
import * as migration_20261012_154428_add_cob_features_blocks from './20261012_154428_add_cob_features_blocks';
import * as migration_20261012_154840_add_cob_about_blocks from './20261012_154840_add_cob_about_blocks';
import * as migration_20261012_155211_add_cob_testimonial_blocks from './20261012_155211_add_cob_testimonial_blocks';
import * as migration_20261012_155351_add_cob_cta_blocks from './20261012_155351_add_cob_cta_blocks';
import * as migration_20261012_155540_add_cob_program_blocks from './20261012_155540_add_cob_program_blocks';
import * as migration_20261012_155735_add_cob_location_blocks from './20261012_155735_add_cob_location_blocks';
import * as migration_20261012_155920_add_cob_services_blocks from './20261012_155920_add_cob_services_blocks';

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
    name: '20261001_185823_body_text_blocks',
  },
  {
    up: migration_20261005_131115_ptoc_page_blocks.up,
    down: migration_20261005_131115_ptoc_page_blocks.down,
    name: '20261005_131115_ptoc_page_blocks',
  },
  {
    up: migration_20261007_144105_ptoc_text_editor_on_pages.up,
    down: migration_20261007_144105_ptoc_text_editor_on_pages.down,
    name: '20261007_144105_ptoc_text_editor_on_pages',
  },
  {
    up: migration_20261012_152941_add_cob_hero_blocks.up,
    down: migration_20261012_152941_add_cob_hero_blocks.down,
    name: '20261012_152941_add_cob_hero_blocks',
  },
  {
    up: migration_20261012_154428_add_cob_features_blocks.up,
    down: migration_20261012_154428_add_cob_features_blocks.down,
    name: '20261012_154428_add_cob_features_blocks',
  },
  {
    up: migration_20261012_154840_add_cob_about_blocks.up,
    down: migration_20261012_154840_add_cob_about_blocks.down,
    name: '20261012_154840_add_cob_about_blocks',
  },
  {
    up: migration_20261012_155211_add_cob_testimonial_blocks.up,
    down: migration_20261012_155211_add_cob_testimonial_blocks.down,
    name: '20261012_155211_add_cob_testimonial_blocks',
  },
  {
    up: migration_20261012_155351_add_cob_cta_blocks.up,
    down: migration_20261012_155351_add_cob_cta_blocks.down,
    name: '20261012_155351_add_cob_cta_blocks',
  },
  {
    up: migration_20261012_155540_add_cob_program_blocks.up,
    down: migration_20261012_155540_add_cob_program_blocks.down,
    name: '20261012_155540_add_cob_program_blocks',
  },
  {
    up: migration_20261012_155735_add_cob_location_blocks.up,
    down: migration_20261012_155735_add_cob_location_blocks.down,
    name: '20261012_155735_add_cob_location_blocks',
  },
  {
    up: migration_20261012_155920_add_cob_services_blocks.up,
    down: migration_20261012_155920_add_cob_services_blocks.down,
    name: '20261012_155920_add_cob_services_blocks'
  },
];
