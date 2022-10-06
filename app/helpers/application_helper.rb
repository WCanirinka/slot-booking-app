module ApplicationHelper
  CURRENT_API_VERSION = 1

  def api_root
    [url_for(root_path), "api/v#{CURRENT_API_VERSION}"].join
  end
end
