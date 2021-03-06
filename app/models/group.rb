require 'pdf/label'

class Group < ActiveRecord::Base
  LABELS_PATH = '/tmp'
  LABELS_FILE = 'mailing_labels.pdf'

  has_and_belongs_to_many :addresses

  before_destroy :clear_address_associations

  validates_presence_of :name

  def self.find_for_list
    Group.order('name')
  end

  def addresses_not_included
    included_ids = self.address_ids
    if included_ids.blank?
      Address.eligible_for_group
    else
      Address.eligible_for_group.where(['id not in (?)', included_ids])
    end
  end

  def create_labels(label_type)
    p = Pdf::Label::Batch.new(label_type.gsub('_', ' '))

    pos = 0
    self.addresses.each do |a|
      label_text =  a.addressee + "\n"
      label_text += a.address1 + "\n"
      label_text += a.address2 + "\n" unless a.address2.blank?
      label_text += a.city + ', ' + a.state + ' ' + a.zip

      begin
        p.add_label(:text => label_text,
                    :position => pos,
                    :font_size => 10,
                    :justification => :center)
        pos = pos.next
      rescue Exception => e
        logger.error(e.message)
      end
    end

    file_path = "#{LABELS_PATH}/#{LABELS_FILE}"
    p.save_as(file_path)
    file_path
  end

  private

    def clear_address_associations
      addresses.clear
    end

end
