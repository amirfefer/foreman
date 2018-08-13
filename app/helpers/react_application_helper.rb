module ReactApplicationHelper
  def mount_react_application
    mount_react_component('Application', "#react-application-root", react_application_data.to_json)
  end

  def react_application_data
    { layout: layout_data }
  end
end